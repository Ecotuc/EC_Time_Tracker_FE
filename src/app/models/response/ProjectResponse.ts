import { Project } from "../Project";

export class ProjectResponse {
    status: number;
    message: String;
    values: Project[];

    constructor(status: number, message: String, values: Project[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}