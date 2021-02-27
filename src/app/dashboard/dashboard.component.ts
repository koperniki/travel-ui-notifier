import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateModel } from '../models/state-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http: HttpClient) { }
  $transferData : Observable<StateModel[]>;
  ngOnInit() {
     this.signalRService.startConnection().then(()=>{
        this.$transferData = this.signalRService.GetTransferStateData();
        this.$transferData.subscribe({next(d) {console.log(d)}})
     });

  }

  onRelease(bNumber: number) : void {
    this.http.get('https://travel.isnot.dev/api/release/'+ bNumber )
      .subscribe(res => {
        console.log(res);
      })
  }

}
