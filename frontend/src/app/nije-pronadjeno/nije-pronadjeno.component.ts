import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-nije-pronadjeno',
  templateUrl: './nije-pronadjeno.component.html',
  styleUrls: ['./nije-pronadjeno.component.css']
})
export class NijePronadjenoComponent implements OnInit {


  constructor() { }

  mobilni = false;
  vid=0;
  prikazi_div:boolean = false;
  ngOnInit(): void {
    if (window.innerWidth<=1000) { 
      this.mobilni = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth<=1000) { 
      this.mobilni = true;
    }else{
      this.mobilni = false
    }

  }

  
  prikazi(){
    this.prikazi_div = true;
    this.slucajan_broj = Math.random()
  }
  videoGotov(){

    this.prikazi_div = false;
  }
  slucajan_broj:number = 0.64
  tip(){
    return this.slucajan_broj<0.75 ? '_orig':''
    
  }

}
