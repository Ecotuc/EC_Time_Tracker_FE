import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FocalPoint } from '../models/FocalPoint';
import { Project } from '../models/Project';
import { FocalPointResponse } from '../models/response/FocalPointResponse';
import { UserData } from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  datepipe: DatePipe = new DatePipe('en-US');
  private currentDate= new BehaviorSubject<Date>(new Date());
  sharedCurrentDate = this.currentDate.asObservable();

  private currentUser= new BehaviorSubject<UserData>(new UserData(0,'','','','[0]', 0, '','',''));
  sharedCurrentUser = this.currentUser.asObservable();

  private currentProject = new BehaviorSubject<Project>(new Project(0,'',true));
  sharedCurrentProject = this.currentProject.asObservable();

  private currentFocal = new BehaviorSubject<FocalPoint>(new FocalPoint(0,0,''));
  sharedCurrentFocal = this.currentFocal.asObservable();

  private currentWorkedHours = new BehaviorSubject<String>('');
  sharedCurrentWorkedHours = this.currentWorkedHours.asObservable();

  private currentTotalHours = new BehaviorSubject<String>('');
  sharedCurrentTotalHours = this.currentTotalHours.asObservable();

  constructor() { }

  setCurrentDate(date: Date) {
    this.currentDate.next(date);
  }

  setCurrentUser(user: UserData) {
    this.currentUser.next(user);
  }

  setFocal(focal: FocalPoint) {
    this.currentFocal.next(focal);
  }

  setProject(project: Project) {
    this.currentProject.next(project);
  }

  setCurrentWorkedHours(hours: String) {
    this.currentWorkedHours.next(hours);
  }

  setCurrentTotalHours(hours: String) {
    this.currentTotalHours.next(hours);
  }

  getMonthName(month: number): String {
    let name:String = "";
    switch(month) {
      case 0 : name='January'; break;
      case 1 : name='February'; break;
      case 2 : name='March'; break;
      case 3 : name='April'; break;
      case 4 : name='May'; break;
      case 5 : name='June'; break;
      case 6 : name='July'; break;
      case 7 : name='August'; break;
      case 8 : name='September'; break;
      case 9 : name='October'; break;
      case 10 : name='November'; break;
      case 11 : name='Dicember'; break;
    }
    return name;
  }

  formatDate(date: Date) {
    return this.datepipe.transform(date, "yyyy-MM-dd");
  }
}
