export class DialogData {
    date : Date;
    hours: number;
    description: number;
    type: number;

    constructor(date: Date, hours: number, description: number, type: number) {
        this.hours = hours;
        this.description = description;
        this.type = type;
        this.date = date;
    }
}