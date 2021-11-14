import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private backend: BackendService,
    private data: DataSharingService
  ) { }

  ngOnInit(): void {
    
  }

}
