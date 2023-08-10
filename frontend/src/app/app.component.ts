import { Component, OnInit } from '@angular/core';
import { PrijavljivanjeService } from './prijavljivanje-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'Реновирајмо заједно';
  tekuca_godina = new Date().getFullYear();
  
  

}
