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
  rutePrijavljenPutnik: Array<string> = ["/","/profil","/pronadjite-prevoz",,"/voznje","/obavestenja","/uslovi-koriscenja"];
  rutePrijavljenPrevoznik: Array<string> = ["/","/profil","/ponudite-prevoz","/voznje","/obavestenja","/uslovi-koriscenja"];
  ruteNijePrijavljen: Array<string> =["/","/registracija","/prijava","/uslovi-koriscenja"];
  sveRute: Array<string> = ["/","/profil","/pronadjite-prevoz","/ponudite-prevoz","/voznje","/obavestenja",
                            "/registracija","/prijava","/uslovi-koriscenja"];


  prijavljenKorisnikIme: string;
  tipKorisnika: string;
  brojObavestenja: number;


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
      this.brojObavestenja = parseInt(this.cookieService.get('brojObavestenja'));
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
          if(this.tipKorisnika=="putnik"){
            this.greska404 = this.rutePrijavljenPutnik.find(e => e==event.url)==undefined;
          }else{
            this.greska404 = this.rutePrijavljenPrevoznik.find(e => e==event.url)==undefined;
          }
        }else{
          this.greska404 = this.ruteNijePrijavljen.find(e => e==event.url)==undefined;
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
    this.cookieService.set('brojObavestenja',"");
    this.ulogovan = false;
    this.snackBar.open("Odjavili ste se");
  }
}
