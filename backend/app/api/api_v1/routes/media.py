from os import remove
from typing import Any, List
from uuid import uuid1

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session

from app.api.dependencies import db, jwt_bearer
from app.services import crud
from app import schemas
from app.utils import generarfactura

from app.assets import facturasdir, imagesdir, videosdir

router = APIRouter()


@router.get('/images/{name}')
def get_images(
    *,
    name: str,
) -> Any:
    '''
    Endpoint for getting images from assets directory

        params: name of the file

        return: image
    '''

    return FileResponse(imagesdir+name)


@router.post('/images')
def post_images(
    *,
    files: List[UploadFile],
    Employee : schemas.Employee = Depends(jwt_bearer.get_current_active_employee)
) -> Any:
    '''
    Endpoint for post an image

        params: File

        return: status code
    '''
    names = []
    for file in files:
        content_type = file.content_type

        if not (content_type == 'image/jpeg' or content_type == 'image/png'):
            return JSONResponse(status_code=406, content={'detail':'Invalid type'})

        name = str(uuid1()) + '.' + content_type.split('/')[1]

        with open(imagesdir+name, 'wb+') as f:
            f.write(file.file.read())

        names += [name]
    return JSONResponse(content={
        'detail': 'Images uploaded',
        'names': names
    },
        status_code=201
    )
