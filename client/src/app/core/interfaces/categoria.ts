export interface CategoryResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  CategoryInside[];
}



export interface Category {
    image: string;
    name:  string;
}

export interface CategoryInside extends Category {
    id : number
}