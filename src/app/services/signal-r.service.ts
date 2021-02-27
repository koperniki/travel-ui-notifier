import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Observable } from 'rxjs';
import { StateModel } from '../models/state-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private hubConnection: signalR.HubConnection

  public startConnection() : Promise<boolean> {
    return new Promise(resolve => {
      if (this.hubConnection === undefined || this.hubConnection.state != signalR.HubConnectionState.Connected ) {
        this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl('https://travel.isnot.dev/api/state',{ skipNegotiation: true,transport: signalR.HttpTransportType.WebSockets})
                                .configureLogging(signalR.LogLevel.Warning)
                                .build();
    
        this.hubConnection
          .start()
          .then(() => {
                        console.log('Connection started');
                        resolve(true);
                      })
          .catch(err => console.log('Error while starting connection: ' + err))
        } else {
          resolve(true);
        }
    });
    
  }

  public GetTransferStateData() : Observable<StateModel[]> {
    return new Observable<StateModel[]>((observer)=>{
      this.hubConnection.on('transferstatedata', (data) => {
        observer.next(data);
      });
    });
  }


}
