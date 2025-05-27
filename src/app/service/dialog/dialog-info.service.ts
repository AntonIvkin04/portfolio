import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {

  constructor() { }

  private infoDialog = new BehaviorSubject<boolean>(true);
  infoDialog$: Observable<boolean> = this.infoDialog.asObservable();

}
