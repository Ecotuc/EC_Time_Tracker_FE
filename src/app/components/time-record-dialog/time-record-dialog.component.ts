import { Component, AfterViewInit, Inject, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectData } from 'src/app/models/SelectData';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData} from '../../models/DialogData';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-time-record-dialog',
  templateUrl: './time-record-dialog.component.html',
  styleUrls: ['./time-record-dialog.component.scss']
})
export class TimeRecordDialogComponent implements OnInit {
  title:String="14/Marzo/2020";
  form:FormGroup = new FormGroup({});
  projectList: SelectData[] = [new SelectData(1,"Pinterest"), new SelectData(2, "TimeTrack"), new SelectData(3, "Helplightning")];
  categoryList: SelectData[] = [new SelectData(1, "Develop"), new SelectData(2, "HHRR"), new SelectData(3, "Project Manager")];
  descriptionList: SelectData[] = [new SelectData(1, "Develop"), new SelectData(2, "HHRR"), new SelectData(3, "Project Manager")];
  constructor(private fb: FormBuilder,
              private dataService: DataSharingService,
              public dialogRef: MatDialogRef<TimeRecordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      task_category:[1],
      task_description: [1],
      project: [1],
      hours: [''],
      info: ['']
    });
    this.dataService.sharedCurrentDate.subscribe(x => {
      this.title= this.dataService.getMonthName(x.getUTCMonth() - 1) + " " + x.getUTCDate() + ", "  + x.getUTCFullYear();
    })
  }

}
