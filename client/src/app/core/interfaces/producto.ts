export interface Producto {
    name: string;
    description: string;
    short_description: string;
    price: number;
    image: string;
    image_galery: string[];
    ingredients: string[];
    category_id: number;
    BaseIVA: number;
}

export interface ProductoInDB extends Producto {
    id: number;
}

export interface ProductosResponse {
    count: number;
    next: string;
    previous: string;
    results: ProductoInDB[];
}