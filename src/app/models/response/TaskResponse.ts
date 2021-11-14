import { Task } from "../Task";

export class TaskResponse {
    status: number;
    message: String;
    values: Task[];

    constructor(status: number, message: String, values: Task[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}