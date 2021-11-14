import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/app/models/Category';
import { Description } from 'src/app/models/Description';
import { FocalPoint } from 'src/app/models/FocalPoint';
import { Project } from 'src/app/models/Project';
import { Task } from 'src/app/models/Task';
import { UserData } from 'src/app/models/UserData';
import { BackendService } from 'src/app/services/backend.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateSelected: String = "";
  formGroup: FormGroup = new FormGroup({});
  projectList: Project[] = [new Project(1, 'Help', true), new Project(2, 'Adis', true)];
  focalList: FocalPoint[] = [new FocalPoint(1,1,'Julio'), new FocalPoint(1,2,'Jose')];
  descriptionList: Description[] = [];
  categoryList: Category[] = [];
  currentProject: Project = new Project(0,'',true);
  currentFocal: FocalPoint = new FocalPoint(0,0,'');
  currentDate: Date = new Date();
  currentUser: UserData = new UserData(0,'','','','',0,'','','');
  totalHours: number = 0;
  
  id: number;
  tasks: Task[] = [];
  edit:boolean = false;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private backend: BackendService,
    private dataService: DataSharingService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      hours: [1],
      project: [1],
      focusPoint: [1],
      description: [1],
      category: [1],
      comments: ['']
    })
    this.dataService.sharedCurrentProject.subscribe(x => this.currentProject = x);
    this.dataService.sharedCurrentFocal.subscribe(x => this.currentFocal = x);
    this.dataService.sharedCurrentDate.subscribe(x => {
      console.log(this.dataService.formatDate(x));
      this.currentDate = x
      this.dateSelected = this.dataService.getMonthName(x.getUTCMonth() - 1) + " " + x.getUTCDate() + ", "  + x.getUTCFullYear();
      this.dataService.sharedCurrentUser.subscribe(user => {
        this.currentUser = user;
        this.backend.getProjects(user.projects).subscribe(projects => {
          this.projectList = projects.values;
          this.formGroup.controls['project'].setValue(this.currentProject.id)
          this.backend.getFocalPoint(this.currentProject.id).subscribe(focals => {
            this.focalList = focals.values;
            this.formGroup.controls['focusPoint'].setValue(this.currentFocal.id);
          });
        });
        this.backend.getTask(this.dataService.formatDate(this.currentDate)!, this.currentUser.id).subscribe(task_response => {
          this.tasks = task_response.values
          this.totalHourByDay();
        });
    });
      this.backend.getCategory().subscribe(categories => {
        this.categoryList = categories.values;
        this.backend.getDescription(this.categoryList[0].id).subscribe(descriptions => {
          this.descriptionList = descriptions.values;
          this.formGroup.controls['description'].setValue(this.descriptionList[0].id);
        });
        this.formGroup.controls['category'].setValue(this.categoryList[0].id);
      });
      
    });
    
  }

  ngAfterViewInit(): void {
    
  }

  setDataInHTML(task: Task) {
    this.formGroup.controls['hours'].setValue(task.hours);
    this.formGroup.controls['category'].setValue(task.category);
    this.formGroup.controls['description'].setValue(task.description);
    this.formGroup.controls['project'].setValue(task.project);
    this.formGroup.controls['focusPoint'].setValue(task.focal_point);
    this.formGroup.controls['comments'].setValue(task.comments);
  }

  editTask(data: Task) {
    this.deleteTaskNotSaved();
    this.edit = true;
    this.id = data.id;
    this.formGroup.controls['hours'].setValue(data.hours);
    this.formGroup.controls['category'].setValue(data.category);
    this.formGroup.controls['description'].setValue(data.description);
    this.formGroup.controls['project'].setValue(data.project);
    this.formGroup.controls['focusPoint'].setValue(data.focal_point);
    this.formGroup.controls['comments'].setValue(data.comments);
  }

  saveTask(data: Task) {
    this.edit = false;
    this.id = data.id;
    let task = new Task(0,this.formGroup.controls['hours'].value,this.formGroup.controls['project'].value,this.getSelectedProjectName(this.formGroup.controls['project'].value)!,
    this.formGroup.controls['focusPoint'].value,this.getSelectedFocalPointName(this.formGroup.controls['focusPoint'].value)!,this.dataService.formatDate(this.currentDate)!,
    this.formGroup.controls['category'].value, this.getSelectedCategoryName(this.formGroup.controls['category'].value)!,this.formGroup.controls['description'].value,
    this.getSelectedDescriptionName(this.formGroup.controls['description'].value)!,this.formGroup.controls['comments'].value, this.currentUser.id );
    if (data.id == 0) {
      console.log(task);
      this.backend.insertTask(task).subscribe(x => {
        console.log(x.message);
        task.id = x.values[0].id;
        this.tasks = this.tasks.map(u => u.id !== 0 ? u : task);
        this.totalHourByDay();
        this.updateHoursWorked()
      });
    } else {
      task.id = data.id;
      this.backend.updateTask(task, task.id).subscribe(x => {
        console.log(x.message);
        console.log("editando la tarea " + task.id);
        this.tasks = this.tasks.map(u => u.id !== task.id ? u : task);
        this.totalHourByDay();
        this.updateHoursWorked()
      });
    }
  }

  deleteTask(data: Task) {
    this.backend.deleteTask(data.id).subscribe(x => {
      if (x.status != 0) {
        this.tasks = this.tasks.filter(x => x.id !== data.id);
        this.totalHourByDay();
        this.updateHoursWorked()
      }
    });
  }

  copyTask(data: Task) {
    let dataNew = new Task(0, data.hours, data.project, data.project_text, data.focal_point, data.focal_point_text, data.date_assigned, data.category, data.category_text, data.description, data.description_text, data.comments,data.user_id);
    this.backend.insertTask(dataNew).subscribe(x => {
      if (x.status != 0) {
        dataNew.id = x.values[0].id;
        this.tasks.push(dataNew);
        this.totalHourByDay();
        this.updateHoursWorked()
      }
    });
  }

  totalHourByDay() {
    this.totalHours = 0;
    return this.tasks.forEach(x => this.totalHours += Number(x.hours));
  }

  changeCategory(id:any) {
    this.backend.getDescription(id).subscribe(descriptions => {
      this.descriptionList = descriptions.values;
      this.formGroup.controls['description'].setValue(this.descriptionList[0].id);
    });
  }

  changeProject(id:any) {
    this.backend.getFocalPoint(id).subscribe(focals => {
      this.focalList = focals.values;
      this.formGroup.controls['focusPoint'].setValue(this.focalList[0].id);
    });
  }

  getSelectedProjectName(id: number) {
    return this.projectList.find(x => x.id === id)?.name; 
  }

  getSelectedFocalPointName(id: number) {
    return this.focalList.find(x => x.id == id)?.name;
  }

  getSelectedCategoryName(id: number) {
    return this.categoryList.find(x => x.id == id)?.category_name;
  }

  getSelectedDescriptionName(id: number) {
    return this.descriptionList.find(x => x.id == id)?.description_name;
  }
  deleteTaskNotSaved() {
    this.tasks = this.tasks.filter(x => x.id != 0);
  }
  addNewTask() {
    this.deleteTaskNotSaved();
    this.backend.getFocalPoint(this.currentProject.id).subscribe(x => {
      this.focalList = x.values;
      let task = new Task(0,1,this.currentProject.id, this.currentProject.name, this.currentFocal.id, this.currentFocal.name, this.dataService.formatDate(this.currentDate)!, 1, 'Absence', 2, 'Personal Reasons','',this.currentUser.id);
      this.tasks.push(task);
      this.edit = true;
      this.id = 0;
      this.setDataInHTML(task);
    });
  }

  updateHoursWorked() {
    this.backend.getWorkedHours((this.currentDate.getUTCMonth() + 1) + '', this.currentDate.getUTCFullYear() + '', this.currentUser.id + '').subscribe(x => {
      console.log('worked hours' + x.values);
      let total = x.values;
      if (x.values == null) {
        total = 0;
      }
      this.dataService.setCurrentWorkedHours(total + '');
    });
  }
  /*
  openDialog() {
    const dialogRef = this.dialog.open(TimeRecordDialogComponent, {
      width: '700px',
      data: {date: new Date(), hours: 1, description: "e", type: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
  */
  
}
