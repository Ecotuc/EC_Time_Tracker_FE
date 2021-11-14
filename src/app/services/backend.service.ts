import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FocalPointResponse } from '../models/response/FocalPointResponse';
import { TaskResponse } from '../models/response/TaskResponse';
import { ProjectResponse } from '../models/response/ProjectResponse';
import { UserResponse } from '../models/response/UserResponse';
import { DataSharingService } from './data-sharing.service';
import { ValueResponse } from '../models/response/ValueResponse';
import { CategoryResponse } from '../models/response/CategoryResponse';
import { DescriptionResponse } from '../models/response/DescriptionResponse';
import { Task } from '../models/Task';

const BE_API = environment.url_backend;
const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private data: DataSharingService) { }

  //project
  getProjects(bloque:String) {
    console.log("URL = " + BE_API + '/project/' + bloque);
    return this.http.get<ProjectResponse>(BE_API + '/project/' + bloque, httpOptions);
  }
  //Task
  getHoursPerMonth(month: String, year: String, lastDay: String) {
    console.log(BE_API + "/hours_per_month/" + year + "/" + month + "/" + lastDay);
    return this.http.get<ValueResponse>(BE_API + "/hours_per_month/" + year + "/" + month + "/" + lastDay, httpOptions);
  }
  getWorkedHours(month: string, year: String, user: String) {
    console.log(BE_API + "/total_hours_worked/" + year + "/" + month + "/" + user);
    return this.http.get<ValueResponse>(BE_API + "/total_hours_worked/" + year + "/" + month + "/" + user, httpOptions);
  }
  getTask(date: String, userId: number) {
    return this.http.get<TaskResponse>(BE_API + '/tasks/' + date + '/' + userId, httpOptions);
  }

  insertTask(data: Task) {
    return this.http.post<TaskResponse>(BE_API + '/tasks', data, httpOptions);
  }
  updateTask(data: Task, id: number) {
    return this.http.put<TaskResponse>(BE_API + '/tasks/' + id, data, httpOptions);
  }
  deleteTask(id: number) {
    return this.http.delete<TaskResponse>(BE_API + '/tasks/' + id, httpOptions);
  }
  //focal point
  getFocalPoint(projectid: number) {
    return this.http.get<FocalPointResponse>(BE_API + '/focal_point/' + projectid, httpOptions);
  }
  //user
  login(user: String, password: String) {
    return this.http.post<UserResponse>(BE_API + '/login', {user, password}, httpOptions);
  }
  //task category
  getCategory() {
    return this.http.get<CategoryResponse>(BE_API + '/task_category', httpOptions);
  }

  //task description
  getDescription(id_category: number) {
    return this.http.get<DescriptionResponse>(BE_API + '/task_description/' + id_category, httpOptions);
  }

}
