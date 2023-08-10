import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nemate-pristup',
  templateUrl: './nemate-pristup.component.html',
  styleUrls: ['./nemate-pristup.component.css']
})
export class NematePristupComponent implements OnInit {

  constructor(private router:Router) { 
    
  }
  brojac:number;
  async ngOnInit(): Promise<void> {
  
    
  }

}
