from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

class ProductoInside(BaseModel):
    id: int
    quantity: int

class VentaBase(BaseModel):
    productos : List[ProductoInside]
    adiciones : Optional[List[int]]
    cantidadxadiciones : Optional[List[int]]
    created_at : Optional[datetime]
    user_id : Optional[int] = 1

class VentaCreate(VentaBase):
    pass

class VentaUpdate(VentaBase):
    pass

class VentaInDB(VentaBase):
    id: Optional[int] = None
    class Config:
        orm_mode = True

class Venta(VentaBase):
    pass