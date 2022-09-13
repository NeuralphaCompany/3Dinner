from fastapi import APIRouter

from app.api.api_v1.routes import (product,
                                   category,
                                   user,
                                   employee,
                                   login,
                                   venta
                                   )


api_route = APIRouter()
api_route.include_router(product.router, prefix="/product", tags=["product"])
api_route.include_router(
    category.router, prefix="/category", tags=["category"])
api_route.include_router(user.router, prefix="/user", tags=["user"])
api_route.include_router(
    employee.router, prefix="/employee", tags=["employee"])
api_route.include_router(login.router, prefix="/login", tags=["login"])
api_route.include_router(venta.router, prefix="/venta", tags=["venta"])
