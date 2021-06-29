export interface Category{
    id: string;
    name: string
}

export class CategoryClass{
    id!: string;
    name!: string

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }
}
