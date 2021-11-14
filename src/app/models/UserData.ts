export class UserData {
    id: number;
    user_login : String;
    user_name : String;
    password : String;
    projects : String;
    coins: number;
    icon: String;
    position: String;
    employeeid: String;

    constructor(id: number, user: String, name: String, password: String, project: String, coins: number, icon: String, position: String, employeeid: String) {
        this.id = id;
        this.user_login = user;
        this.user_name = name;
        this.password = password;
        this.projects = project;
        this.coins = coins;
        this.icon = icon;
        this.position = position;
        this.employeeid = employeeid;
    }
}