from typing import List

from sqlalchemy.orm import Session

from app.services.crud.base import CRUDBase
from app.models.venta import Venta
from app.schemas.venta import VentaCreate, VentaUpdate

class CRUDVenta(CRUDBase[Venta, VentaCreate, VentaUpdate]):
    pass

venta = CRUDVenta(Venta)