import { Category } from "../Category";

export class CategoryResponse {
    status: number;
    message: String;
    values: Category[];

    constructor(status: number, message: String, values: Category[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}