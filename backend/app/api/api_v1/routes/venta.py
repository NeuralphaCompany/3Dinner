from os import remove
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session

from app.api.dependencies import db, jwt_bearer
from app.services import crud
from app import schemas
from app.utils import generarfactura

from app.assets import facturasdir


router = APIRouter()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/api/v1/venta/ws/");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/ws")
async def get():
    return HTMLResponse(html)

@router.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        await websocket.send_json(data)

@router.post("/", status_code=200)
def create_venta(
    *,
    db: Session = Depends(db.get_db),
    venta: schemas.VentaCreate,
) -> Any:
    '''
    Endpoint to create a new sale

        params: sale: SaleCreate

        return: application/pdf 
    '''

    Venta: schemas.VentaInDB = crud.venta.create(db, obj_in=venta)

    factura = generarfactura.generate(db, venta=Venta)

    return Venta


@router.get("/", status_code=201)
def get_ventas(
    *,
    db: Session = Depends(db.get_db),
    employee: schemas.Employee = Depends(
        jwt_bearer.get_current_active_employee),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Endpoint fot getting all the sales

        params: skip, limit

        return: List of sales
    """

    db_sales = jsonable_encoder(
        crud.venta.get_multi(db=db, skip=skip, limit=limit)
    )

    return JSONResponse(
        status_code=200,
        content={
            'count': len(db_sales),
            'next': f'http://localhost:8000/api/v1/venta?skip={skip+limit}&limit={limit}',
            'previous': None if skip == 0 else f'http://localhost:8000/api/v1/venta?skip={skip-limit}&limit={limit}',
            'results': db_sales
        }
    )

@router.get("/active", status_code=201)
def get_ventas_active(
    *,
    db: Session = Depends(db.get_db),
    employee: schemas.Employee = Depends(
        jwt_bearer.get_current_active_employee),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Endpoint fot getting all the sales

        params: skip, limit

        return: List of sales
    """

    db_sales = jsonable_encoder(
        crud.venta.active_venta(db, skip=skip, limit=limit)
    )

    return JSONResponse(
        status_code=200,
        content={
            'count': len(db_sales),
            'next': f'http://localhost:8000/api/v1/venta?skip={skip+limit}&limit={limit}',
            'previous': None if skip == 0 else f'http://localhost:8000/api/v1/venta?skip={skip-limit}&limit={limit}',
            'results': db_sales
        }
    )


@router.get("/{id}", status_code=200)
def read_venta(
    *,
    db: Session = Depends(db.get_db),
    employee: schemas.Employee = Depends(
        jwt_bearer.get_current_active_employee),
    id: int
) -> Any:
    '''
    Endpoint to get a sale

        params: id

        return: sale
    '''

    db_sale = crud.venta.get(db=db, id=id)

    if not db_sale:
        return HTTPException(
            status_code=404,
            detail="Venta not found"
        )
    return db_sale


@router.delete('/{id}', status_code=200)
def delete_venta(
    *,
    db: Session = Depends(db.get_db),
    employee: schemas.Employee = Depends(
        jwt_bearer.get_current_active_employee),
    id: int
) -> Any:
    """
    Endpoint for deleting an sale

        params: id

        return: status code 204
    """

    db_sale = crud.venta.get(db, id=id)
    if not db_sale:
        return HTTPException(404, "Not Found")
    db_sale = crud.venta.delete(db, id=id)
    remove(facturasdir+f'factura_{id}.pdf')
    return JSONResponse(status_code=200, content={
        'detail': 'Sale deleted'
    })


@router.get('/factura/{id}', status_code=200)
def get_factura(
    id: int,
):
    return FileResponse(facturasdir + f'factura_{id}.pdf')

@router.put('/{id}', status_code=200)
def update_venta(
    id: int,
    body: schemas.Estado,
    *,
    db: Session = Depends(db.get_db),
    employee: schemas.Employee = Depends( jwt_bearer.get_current_active_employee)
):
    db_obj = crud.venta.get(db, id)
    crud.venta.update(db, db_obj=db_obj, obj_in=body.dict())