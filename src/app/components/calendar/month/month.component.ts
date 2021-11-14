import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { BackendService } from 'src/app/services/backend.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Day } from '../../../models/Day'

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit, OnChanges {
  monthDays: Day[] = [];
  initialDate: Date = new Date();
  finalDate: Date=new Date();
  @Input("month-number") month: number = 1;
  @Input("month-year") year: number = 1;
  currentUser: UserData = new UserData(0,'','','','',0,'','','');
  constructor(
    private backend: BackendService,
    private data: DataSharingService) { 
  }

  ngOnInit(): void {
    this.monthDays = [];
    this.drawCalendar();
    this.data.sharedCurrentUser.subscribe( x => {
      this.currentUser = x;
      this.updateHours();
    });
  }

  getNumericString(lenght: number, value: number) {
    return ("00000" + value).slice(lenght*-1)
  }

  drawCalendar() {
    this.initialDate = new Date(this.year, this.month - 1, 1);
    this.finalDate = new Date(this.year,  this.month, + 0);
    //console.log(this.initialDate.getUTCFullYear() + "/" + (this.initialDate.getUTCMonth() + 1) + "/" + this.initialDate.getUTCDate() + " day: " +this.initialDate.getUTCDay());
    //console.log(this.finalDate.getUTCFullYear() + "/" + (this.finalDate.getUTCMonth() + 1) + "/" + this.finalDate.getUTCDate()+ " day: " +this.finalDate.getUTCDay());
    for (let i = 0; i < this.initialDate.getUTCDay(); i ++) {
      this.monthDays.push(new Day(0,0));
    }
    for (let i = this.initialDate.getUTCDate(); i <= this.finalDate.getUTCDate(); i++) {
      this.monthDays.push(new Day(i,0));
    }
  }

  ngOnChanges() {
    //console.log(this.month + ' - ' + this.year)
    this.monthDays = [];
    this.drawCalendar();
    if (this.currentUser.id != 0) {
      this.updateHours();
    }
  }

  updateHours() {
    this.backend.getHoursPerMonth(this.getNumericString(2,this.month), this.year + '', new Date(this.year, this.month, 0).getUTCDate() + '').subscribe(x => {
      console.log('total hours' + x.values);
      this.data.setCurrentTotalHours(x.values +'');
    });
    this.backend.getWorkedHours(this.month + '', this.year + '', this.currentUser.id + '').subscribe(x => {
      console.log('worked hours' + x.values);
      let total = x.values;
      if (x.values == null) {
        total = 0;
      }
      this.data.setCurrentWorkedHours(total + '');
    });
  }
}
