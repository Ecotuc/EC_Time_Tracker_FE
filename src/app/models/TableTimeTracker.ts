export class TableTimeTracker {
    hours: number;
    project: String; 
    task_category: String;
    task_description: String; 
    info: String;
    user: number;

    constructor(hours: number, project: String, task_category: String, task_description: String, info: String, user: number) {
        this.hours = hours;
        this.project = project;
        this.task_category = task_category;
        this.task_description = task_description;
        this.info = info;
        this.user = user;
    }
}