import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Poruka } from './poruka.model';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { CookieService } from 'ngx-cookie-service';
import { PorukaService } from './poruka.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  porukeKorisnikaId: Array<number> = [];
  porukeKorisnika: Array<Poruka> = [];
  procitanePoruke: Array<boolean> = [];
  porukeProsireno: Array<any> = [];
  email:string;

  constructor(private titleService: Title, private korisnikService:KorisnikService, 
              private porukaService:PorukaService,private cookieService:CookieService,
              private appComponent:AppComponent) { }

  ngOnInit() {
    this.titleService.setTitle("Obaveštenja");
    this.email = this.cookieService.get('korisnikEmail');
    this.porukeKorisnikaId = this.korisnikService.getPorukeByEmail(this.email);
    this.porukeKorisnikaId.forEach(id=>this.porukeKorisnika.push(this.porukaService.getPorukaById(id)));
    this.procitanePoruke = this.korisnikService.getProcitanePoruke(this.email);
    this.appComponent.brojObavestenja = this.korisnikService.getBrojNeprocitanihPoruka(this.email);
    this.cookieService.set('brojObavestenja',this.appComponent.brojObavestenja+"");
    
    for(let i=0; i<this.porukeKorisnika.length; i++){
      this.porukeProsireno.push({
        naslov: this.porukeKorisnika[i].naslov,
        tekst: this.porukeKorisnika[i].tekst,
        tip: this.porukeKorisnika[i].tip,
        datum: this.porukeKorisnika[i].datum,
        procitana: this.procitanePoruke[i]
      });
    }
  }

  procitaj(poruka, i:number){
    this.korisnikService.getKorisnikByEmail(this.email).porukeProcitane[i] = true;
    if(this.appComponent.brojObavestenja>0 && !poruka.procitana){
      this.appComponent.brojObavestenja--;
      this.cookieService.set('brojObavestenja',this.appComponent.brojObavestenja+"");
    }
    poruka.procitana = true;
  }
}
