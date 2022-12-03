from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, JSON, DateTime, ForeignKey, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.services.db.base_class import Base

if TYPE_CHECKING:
    from .user import User

class Venta(Base):
    id = Column(Integer, primary_key=True)
    productos = Column(JSON, nullable=False)
    adiciones = Column(JSON, nullable=True)
    cantidadxadiciones = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(Integer, ForeignKey("user.id"))
    estado = Column(String(255), nullable=False, default='Pedido')
    mesa = Column(Integer, nullable = False, default=0)
    observacion: Column(String(255), nullable = True)
    user = relationship("User", back_populates="ventas")