from os import remove
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session

from app.api.dependencies import db, jwt_bearer
from app.services import crud
from app import schemas
from app.utils import generarfactura

from app.assets import facturasdir


router = APIRouter()


@router.post("/", status_code=201)
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

    return FileResponse(path=facturasdir+f'factura_{Venta.id}.pdf', media_type='application/pdf')


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
