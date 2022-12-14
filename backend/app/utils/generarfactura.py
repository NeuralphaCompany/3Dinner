from weasyprint import HTML, CSS
from datetime import datetime

from sqlalchemy.orm import Session

from app.schemas.venta import VentaInDB
from app.services import crud
from app.assets import imagesdir, facturasdir


def generate(db:Session, *, venta: VentaInDB) -> bytes or None:

    productsid = [product['id'] for product in venta.productos]
    productos = crud.producto.get_multi_ids(db, list_ids=productsid)

    tabla = ''
    total = 0
    subtotal = 0
    impuestos = 0

    for producto, _ in zip(productos, venta.productos):
        tabla += f'''
            <tr>
                <td class="cantidad">{_['quantity']}</td>
                <td colspan="3">{producto.name}</td>
                <td colspan="2">{producto.price}</td>
            </tr>
        '''
        subtotal += int(producto.price*_['quantity']*((100-producto.BaseIVA)*0.01))
        impuestos += int(producto.price*_['quantity']*(producto.BaseIVA)*0.01)
        total += producto.price*_['quantity']
    html = HTML(string=f'''
    <!DOCTYPE html>
    <html>
        <div class="container">
            <div class="top">
                <header>
                    <img src="logo.svg" class="logo">
                    <span>{datetime.now().strftime('%Y-%m-%d-%H:%M:%S')}</span>
                </header>
                <div class="Info-empresa">
                    <div class="informacion">
                        <span>Razón social:</span>
                        <span>Nit: </span>
                        <span>
                            Teléfono:
                        </span>
                        <span>Resolución Dian: </span>
                        <span>Dirección: </span>
                        <span>Responsable de IVA </span>
                    </div>
                    <span class="consecutivo">No. {venta.id}</span>
                </div>
                <hr>

                <div class="compra">
                    <table class="default">
                        <thead>
                            <tr>
                                <th class="cantidad" colspan="1">CANTIDAD</th>
                                <th colspan="3">Descripcion</th>
                                <th colspan="2">VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla}
                        </tbody>
                        
                        
                    </table>
                    <div class="resume">
                        <span> SUBTOTAL: {subtotal}</span>
                        <span> Total impuestos: {impuestos}</span>
                        <span><b>Total: {total}</b></span>
                    </div>
                </div>
                <hr>
            </div>


            <div class="footer">
                <span>Aquí el cliente agrega un disclaimer de su negocio</span>
                <span>Desarrollado por <a href="http://www.neuralpha-dev.com">Neuralpha ® </a></span>
            </div>
        </div>
    </html>
    ''', base_url=imagesdir)
    css = CSS(string='''
    @page {
        size: A2;
        margin-left: 0.5cm;
       margin-top: 0.5cm;
       margin-bottom: 0.5cm;
    }
    html{
    display: flex;
    flex-direction: column;
    align-items: center;
}
    .top{
        width: 1191px;
    }
    body{
        width: 1191px;
    }
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        width: 1191px;
    height: 1684px;
    }

    .compra {
        width: 1191px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-items: flex-end;
        align-items: flex-end;
        margin-right: 0;
        margin-left: auto;
    }
    .cantidad{
        white-space: nowrap;
        width: 20px;
    }

    .default {
        width:1191px;
    }

    .resume{
        text-align: end;
        width:1191px;
        display: flex;
        width: fit-content;
        flex-direction: column;
        justify-items: flex-end;
    }

    header{
        display: flex;
        width: 1191px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .Info-empresa {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .consecutivo {
        font-size: x-large;
        color: #ED9642;
    }

    hr{
        border: 1px #000 solid;
        width: 1191px;
    }

    .informacion {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: large;

    }

    td, th {
        padding: 10px;
        border-right: 1px #000 solid;
        border-left: 1px #000 solid;
    }

    table {
        border-collapse: collapse;
        border-top: 1px #000 solid;
        border-bottom: 1px #000 solid;
    }

    tbody>tr:nth-child(odd) {
        background-color: rgba(237, 150, 66, 0.1);
    }

    .footer{
        width:1191px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
        '''
              )

    factura = html.write_pdf(target=facturasdir+f'factura_{venta.id}.pdf', stylesheets=[css],)
    
    return factura
