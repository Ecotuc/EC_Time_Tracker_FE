export class Description {
    id: number;
    category_id: number;
    description_name: String;

    constructor(id: number, category_id: number, description_name: String) {
        this.id = id;
        this.category_id = category_id;
        this.description_name = description_name;
    }
}