import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { TimeRecordDialogComponent } from '../../time-record-dialog/time-record-dialog.component';
const dayColor = {NORMAL : '#AAAAAA', SUCCESS: '#00FF00', FAIL: '#FF0000', HOLIDAY: '#2323FF', TODAY: '#00BBFF'}
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input("day-number") dayNumber:number= 1;
  @Input("day-hours") hours:number = 1;
  @Input("current-month") month: number = 0;
  @Input("current-year") year: number = 0;
  bgColor= dayColor.NORMAL
  thisDay: Date;
  today=new Date();
  appearence ="day_num"
  
  constructor(private dataService: DataSharingService) { }

  ngOnInit(): void {
    let currentDate = new Date();
    this.thisDay = new Date(this.year, this.month, this.dayNumber);
    if (this.thisDay.getUTCDate() == this.today.getUTCDate() && this.thisDay.getUTCMonth() == this.today.getUTCMonth() && this.thisDay.getUTCFullYear() == this.today.getUTCFullYear()) {
      this.appearence = "day_selected";
    }
  }

  saveDate() {
    this.dataService.setCurrentDate(new Date(this.year, this.month - 1, this.dayNumber))
  }

}
