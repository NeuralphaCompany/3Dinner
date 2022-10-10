export interface CategoriesResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  CategoryInDB[];
}



export interface Category {
    image: string;
    name:  string;
}


export interface CategoryInDB extends Category {
    id : number;
}