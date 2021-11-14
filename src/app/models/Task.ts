export class Task {
    id: number; 
    hours: number; 
    project: number;
    project_text: String;
    focal_point: number;
    focal_point_text : String;
    date_assigned: String; 
    category: number;
    category_text: String; 
    description: number; 
    description_text: String;
    comments: String; 
    user_id: number;

    constructor(id: number, hours: number, project: number, project_text: String, focal_point: number, focal_point_text: String, date_assigned: String, 
        category: number,category_text: String, description: number,description_text: String, comments: String, user_id: number) {
        this.id = id; 
        this.hours = hours;
        this.project = project; 
        this.project_text = project_text;
        this.focal_point = focal_point;
        this.focal_point_text = focal_point_text; 
        this.date_assigned = date_assigned; 
        this.category = category; 
        this.category_text = category_text;
        this.description = description; 
        this.description_text = description_text;
        this.comments= comments; 
        this.user_id = user_id;
    }

    
}