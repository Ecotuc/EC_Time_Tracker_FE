import { UserData } from "../UserData";

export class UserResponse {
    status: number;
    message: String;
    values: UserData[];

    constructor(status: number, message: String, values: UserData[]) {
        this.status = status;
        this.message = message;
        this.values = values;
    }
}