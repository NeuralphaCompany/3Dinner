export interface Empleado {
    email: string;
    is_active: boolean;
    name: string;
    cellphone: string;
    created_at: Date;
    rol: number;
    is_superuser: false;
    image?: string;
}

export interface EmpleadoCreate extends Empleado{
    password: string; 
}

export interface EmpleadoInDB extends Empleado {
    id: number;
}

export interface EmpleadosResponse {
    count: number;
    next: string;
    previous: string;
    results: EmpleadoInDB[];
}