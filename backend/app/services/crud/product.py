from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import tuple_

from app.services.crud.base import CRUDBase


from app.models.producto import Producto
from app.schemas.producto import ProductoCreate, ProductoUpdate


class CRUDProducto(CRUDBase[Producto, ProductoCreate, ProductoUpdate]):
    def get_multi_by_category(
        self, db: Session, *, skip: int = 0, limit: int = 100, category_id: int = 1
    ) -> List[Producto]:
        return (db.query(self.model).
                filter(Producto.category_id == category_id).
                offset(skip).
                limit(limit).
                all()
                )

    def get_multi_ids(
        self, db: Session, *, list_ids: List[int]
    ) -> List[Producto]:
        return (
            db.query(self.model).
            filter(Producto.id.in_(list_ids)).
            all()
        )


producto = CRUDProducto(Producto)
