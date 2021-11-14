import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectData } from 'src/app/models/SelectData';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  today = new Date();
  month: number = (new Date()).getUTCMonth();
  currentYear: number = (new Date()).getUTCFullYear();
  showMonthText: boolean = true;
  showYearText: boolean = true;
  year: number = this.currentYear;
  form: FormGroup = new FormGroup({});
  monthNames: SelectData[] =  [new SelectData(0,'January'), new SelectData(1,'February'), new SelectData(2,'March'), new SelectData(3,'April'), new SelectData(4,'May'), 
    new SelectData(5,'June'), new SelectData(6,'July'), new SelectData(7,'August'), new SelectData(8,'September'), new SelectData(9,'October'), new SelectData(10,'November'), 
    new SelectData(11,'December')];
  yearList: SelectData[] = [new SelectData(this.currentYear -1, String(this.currentYear -1)), new SelectData(this.currentYear, String(this.currentYear)), 
    new SelectData(this.currentYear + 1,String(this.currentYear + 1)), new SelectData(this.currentYear + 2, String(this.currentYear + 2)), 
    new SelectData(this.currentYear + 3, String(this.currentYear + 3))];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      month: [this.month],
      year: [this.year]
    })
  }

  moveMonth(diff:number) {
    if (diff === -1 && this.month === 0) {
      this.month = 12;
      this.year = this.year - 1;
    }
    if (diff === 1 && this.month === 11) {
      this.month = 0;
      this.year = this.year + 1;
    }
    this.month = this.month + diff;
    this.form.controls['month'].setValue(this.month);
    this.form.controls['year'].setValue(this.year);
  }

  selectNewMonth(event: any) {
      this.month = event;
      this.form.controls['month'].setValue(this.month);
      this.showMonthText = true;
  }

  selectNewYear(event: any) {
    this.year = event;
    this.form.controls['year'].setValue(this.year);
    this.showYearText = true;
  }

  editMonth() {
    this.showMonthText = false;
    this.showYearText = true;
  }

  editYear() {
    this.showYearText = false;
    this.showMonthText = true;
  }

}
