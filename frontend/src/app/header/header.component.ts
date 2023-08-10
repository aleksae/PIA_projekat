import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BroadcastService } from '../broadcast.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private url:LocationStrategy, private broadcastService: BroadcastService) {

   }
  ulogovan: any;
  aktivan = null;
  admin:boolean=false;
  ngOnInit(): void {
    
    this.router.events.subscribe((val:any)=>{

        if(val.url){
              this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
              if(localStorage.getItem("admin")){
                this.admin = true;
              }else{
                this.admin = false
              }
         }
        
    })
    this.broadcastService.azurirajUlogovanog.subscribe((msg: any) => {
      if(msg['status']==1) this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
      if(localStorage.getItem("admin")){
        this.admin = true;
      }else{
        this.admin = false
      }
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar
          if (this.url.path().includes('/objekti') || this.url.path().includes('radnici') ) 
          {  
              this.aktivan = 2; 
          }else if(this.url.path().includes('/profil')){
            this.aktivan = 1; 
          }else if(this.url.path().includes('pregled_agencija')){
            this.aktivan=3
          }else if(this.url.path().includes('poslovi')){
            this.aktivan=4
          }
      }

      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          if (this.url.path().includes('/objekti')) 
          {  
              this.aktivan = 2; 
          }else if(this.url.path().includes('/profil')){
            this.aktivan = 1; 
          }else if(this.url.path().includes('agenc')){
            this.aktivan=3
          }else if(this.url.path().includes('poslovi')){
            this.aktivan=4
          }
          
          
      }
    })

    
  }

  ngAfterViewInit(){
    
    if (this.url.path().includes('/objekti')) 
    {  
        this.aktivan = 2; 
    }else if(this.url.path().includes('/profil')){
      this.aktivan = 1; 
    }
    
  }
  odjava(){
    localStorage.removeItem("klijent");
    localStorage.removeItem("agencija");
    localStorage.removeItem("admin")
    this.router.navigate([""]);
  }
  

  

}
