import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  /**
   * status table
   * 1 - azuriran klijent
   */
  azurirajUlogovanog = new Subject<{}>();
  porukaOStatusu = new Subject<{}>();

  constructor() { }
}
