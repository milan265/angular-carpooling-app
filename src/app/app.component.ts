import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { KorisnikService } from './auth/korisnik.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  greska404: boolean = false;
  ulogovan: boolean;
  rutePrijavljen: Array<string> = ["/","/profil","/pronadjite-prevoz","/ponudite-prevoz","/voznje","/obavestenja","/uslovi-koriscenja"];
  ruteNijePrijavljen: Array<string> =["/","/registracija","/prijava","/uslovi-koriscenja"];
  sveRute: Array<string> = ["/","/profil","/pronadjite-prevoz","/ponudite-prevoz","/voznje","/obavestenja",
                            "/registracija","/prijava","/uslovi-koriscenja"];


  prijavljenKorisnikIme: string;
  tipKorisnika: string= 'prevoznik';
  brojObavestenja: number = 3;


  constructor (private cookieService: CookieService, private router: Router, private snackBar: MatSnackBar,
              private korisnikService: KorisnikService) {}

  async ngOnInit(){
    if(this.cookieService.check('ulogovan')){
      if(this.cookieService.get('ulogovan')=='true'){
        this.ulogovan = true;
      }else{
        this.ulogovan = false;
      }
      /*this.prijavljenKorisnikIme = this.cookieService.get('prijavljenKorisnikIme');
      this.tipKorisnika = this.cookieService.get('tipKorisnika');*///ovo bi moglo kad bi se podaci cuvali u bazi
      let email:string = this.cookieService.get('korisnikEmail');
      this.prijavljenKorisnikIme = this.korisnikService.getImeByEmail(email);
      this.tipKorisnika = this.korisnikService.getTipByEmail(email);
      this.cookieService.set('prijavljenKorisnikIme',this.prijavljenKorisnikIme);
      this.cookieService.set('tipKorisnika',this.tipKorisnika);
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

  odjaviSe():void{
    this.prijavljenKorisnikIme = "";
    this.cookieService.set('ulogovan', 'false');
    this.cookieService.set('prijavljenKorisnikIme',"");
    this.cookieService.set('tipKorisnika',"");
    this.cookieService.set('korisnikEmail',"");
    this.ulogovan = false;
    this.snackBar.open("Odjavili ste se");
  }
}
