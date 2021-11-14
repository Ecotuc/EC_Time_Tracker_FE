export class FocalPoint {
    id: number; 
    id_project: number; 
    name: String;
    
    constructor(id: number, id_project: number, name: String) {
        this.id = id;
        this.id_project = id_project;
        this.name = name;
    }
}