import { FocalPoint } from "../FocalPoint";

export class FocalPointResponse {
    status: number;
    message: String;
    values: FocalPoint[];

    constructor(status: number, message: String, values: FocalPoint[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}