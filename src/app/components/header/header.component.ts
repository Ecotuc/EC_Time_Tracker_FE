import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FocalPoint } from 'src/app/models/FocalPoint';
import { Project } from 'src/app/models/Project';
import { SelectData } from 'src/app/models/SelectData';
import { UserData } from 'src/app/models/UserData';
import { BackendService } from 'src/app/services/backend.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  hoursWorked: number = 36;
  //formGroup= new FormGroup({});
  hoursExpected : number = 189;
  currentUser: UserData;
  currentProjectId :number = 0;
  projectList: SelectData[] = [new SelectData(0, 'Choose An Option')];
  focalList: SelectData[] = [new SelectData(0, 'Choose An Option')];
  constructor(
    private fb: FormBuilder,
    private data: DataSharingService,
    private backend: BackendService) { }

  ngOnInit(): void {
    this.data.sharedCurrentUser.subscribe( user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    this.data.sharedCurrentTotalHours.subscribe(x => this.hoursExpected = Number(x));
    this.data.sharedCurrentWorkedHours.subscribe(x => this.hoursWorked = Number(x));
    /*
    this.formGroup = this.fb.group({
      project : [0],
      focusPoint: [0]
    });
    */
  }
  ngAfterViewInit(): void {
    console.log("After View inits");
    this.backend.getProjects(this.currentUser.projects).subscribe(projectArray => {
      this.projectList = [];
      this.data.setProject(projectArray.values[0]);
      projectArray.values.forEach(x => {
        this.projectList.push(new SelectData(x.id, x.name));
      });
      if (this.projectList.length > 0) {
       this.updateFocalPoint(this.projectList[0].id);
       this.currentProjectId = this.projectList[0].id;
       //this.formGroup.controls['project'].setValue(this.projectList[0].id);
      }
    });
  }

  changeProject(event: any) {
    let name: String = this.getSelectedProjectName(event)!;
    this.currentProjectId = event;
    this.data.setProject(new Project(event,name, true));
    this.updateFocalPoint(event);
  }

  changeFocal(event: any) {
    this.data.setFocal(new FocalPoint(event, this.currentProjectId, this.getSelectedProjectName(event)!));
  }

  updateFocalPoint(id: number) {
    this.backend.getFocalPoint(id).subscribe(focalPointArray => {
      this.focalList = [];
      this.data.setFocal(focalPointArray.values[0]);
      focalPointArray.values.forEach(x => 
        this.focalList.push(new SelectData(x.id, x.name))
      );
     // this.formGroup.controls['focusPoint'].setValue(this.focalList[0].id);
     // console.log(this.getSelectedProjectName(this.formGroup.controls['project'].value));
    });
  }

  getSelectedProjectName(id: number) {
    return this.projectList.find(x => x.id === id)?.name; 
  }

  getSelectedFocalPointName(id: number) {
    return this.focalList.find(x => x.id == id)?.name;
  }

}
