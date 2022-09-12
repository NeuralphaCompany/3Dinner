from typing import Any, List

from fastapi import APIRouter, Depends, status, Body

from sqlalchemy.orm import Session

from app.api.dependencies import db
from app.services import crud
from app import schemas
from app.utils import generarfactura


router = APIRouter()

@router.post("/", status_code=201)
def create_venta(
    *,
    db: Session = Depends(db.get_db),
    list: List[int] = Body(None),
) -> Any:
    productos = crud.producto.get_multi_ids(db, list)
    generarfactura.generate(productos)
    return 'Se generó'