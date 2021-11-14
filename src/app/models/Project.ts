export class Project {
    id: number;
    name: String;
    active: boolean;

    constructor(id: number, name: String, active: boolean) {
        this.id = id;
        this.name = name;
        this.active = active;
    }
}