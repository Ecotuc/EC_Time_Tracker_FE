import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayComponent } from './components/calendar/day/day.component';
import { MonthComponent } from './components/calendar/month/month.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { TimeRecordDialogComponent } from './components/time-record-dialog/time-record-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorComponent } from './components/calendar/selector/selector.component';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    MonthComponent,
    TimeRecordDialogComponent,
    SelectorComponent,
    HeaderComponent,
    TasksComponent,
    SelectDateComponent,
    ToolsComponent,
    ToolbarComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
