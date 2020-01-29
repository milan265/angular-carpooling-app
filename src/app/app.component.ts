import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  greska404: boolean = false;
  ulogovan: boolean;
  rutePrijavljen: Array<string> = ["/","/profil","/pronadjite-prevoz","/ponudite-prevoz","/istorija","/obavestenja","/uslovi-koriscenja"];
  ruteNijePrijavljen: Array<string> =["/","/registracija","/prijava","/uslovi-koriscenja"];
  sveRute: Array<string> = ["/","/profil","/pronadjite-prevoz","/ponudite-prevoz","/istorija","/obavestenja",
                            "/registracija","/prijava","/uslovi-koriscenja"];


  prijavljenKorisnikIme: string;

  constructor (private cookieService: CookieService, private router: Router, private snackBar: MatSnackBar) {}

  async ngOnInit(){
    if(this.cookieService.check('ulogovan')){
      if(this.cookieService.get('ulogovan')=='true'){
        this.ulogovan = true;
      }else{
        this.ulogovan = false;
      }
    }else{
      this.cookieService.set( 'ulogovan', 'false');
      this.ulogovan = false;
    }
    
    await this.router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        if(this.ulogovan){
          if(this.rutePrijavljen.find(e => e==event.url)==undefined){
            this.greska404 = true;
          }
        }else{
          if(this.ruteNijePrijavljen.find(e => e==event.url)==undefined){
            this.greska404 = true;
          }
        }
      
        if(this.sveRute.find(e => e==event.url)==undefined){
          this.greska404 = true;
        }
      }
    });
    if(this.greska404){
      this.router.navigate(["404"]);
    }
  }

  odjaviSe(){
    this.prijavljenKorisnikIme = "";
    this.cookieService.set('ulogovan', 'false');
    this.ulogovan = false;
    this.snackBar.open("Odjavili ste se");
  }
}
