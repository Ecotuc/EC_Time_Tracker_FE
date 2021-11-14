
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quotes } from 'src/app/models/Quotes';
import { UserData } from 'src/app/models/UserData';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user = new UserData(0,'','','','',0,'','','');
  quote: Quotes = new Quotes("","");
  quotes: Quotes[] = [new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins1'), new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins2'),
  new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins3'),new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins4'),
  new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins5'),new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins6'),
  new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins7'),new Quotes('“It’s not knowing what to do; it’s doing what you know.”', '— Tony Robbins8'),]

  constructor(
    private data: DataSharingService,
    private router: Router) { }

  ngOnInit(): void {
    this.data.sharedCurrentUser.subscribe(x => {
      this.user = x;
      this.router.navigateByUrl('/login');
    });
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  logout() {
    this.data.setCurrentUser(new UserData(0,'','','','',0,'','',''));
  }

}
