import { Description } from "../Description";

export class DescriptionResponse {
    status: number;
    message: String;
    values: Description[];

    constructor(status: number, message: String, values: Description[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}