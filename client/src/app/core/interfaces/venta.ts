export interface ProductoInside {
    id: number;
    quantity: number;
    price: number;
    name: string;
    image: string;
}


export interface AdicionesInside{
    id: number;
    quantity: number;
    price: number;
}


export interface Venta {
    productos: ProductoInside[];
    adiciones: AdicionesInside[];
    mesa?: number;
    user_id?: number;
    observacion: string;
}


export interface VentaInDB extends Venta {
    id: number;
    created_at: Date;
    estado: string;
}

