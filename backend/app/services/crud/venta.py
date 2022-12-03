from typing import List

from sqlalchemy.orm import Session

from app.services.crud.base import CRUDBase
from app.models.venta import Venta
from app.schemas.venta import VentaCreate, VentaUpdate


class CRUDVenta(CRUDBase[Venta, VentaCreate, VentaUpdate]):
    def active_venta(self, db: Session, *, skip: int = 0, limit: int = 100):
        return db.query(Venta).filter(Venta.estado != 'FINALIZADO').offset(skip).limit(limit).all()


venta = CRUDVenta(Venta)
