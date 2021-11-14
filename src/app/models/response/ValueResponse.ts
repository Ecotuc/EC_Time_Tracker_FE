export class ValueResponse {
    status: number;
    message: String;
    values: number;

    constructor(status: number, message: String, values: number) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}