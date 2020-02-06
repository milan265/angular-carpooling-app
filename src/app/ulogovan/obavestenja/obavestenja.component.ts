import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Poruka } from './poruka.model';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { CookieService } from 'ngx-cookie-service';
import { PorukaService } from './poruka.service';
import { AppComponent } from 'src/app/app.component';
import { VoznjaService } from '../voznje/voznja.service';
import { Voznja } from '../voznje/voznja.model';
import { MatSnackBar } from '@angular/material';

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
              private appComponent:AppComponent, private voznjaService:VoznjaService,
              private snackBar:MatSnackBar) { }

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
        procitana: this.procitanePoruke[i],
        ko: this.porukeKorisnika[i].ko,
        kome: this.porukeKorisnika[i].kome,
        idVoznje: this.porukeKorisnika[i].idVoznje,
        odgovor: this.porukeKorisnika[i].odgovor,
        idPoruke: this.porukeKorisnika[i].id
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

  prihvatam(poruka):void{
    let voznja:Voznja = this.voznjaService.getVoznjaById(poruka.idVoznje);
    if(voznja.brojSlobodnihMesta>0){
      let naslov:string = "Prihvaćena vožnja";
      let tekst:string ="Vaš zahtev za vožnju je prihvaćen";
      let ko:number = poruka.kome[0];
      let kome:Array<number> = [poruka.ko];
      this.porukaService.posaljiPoruku(naslov,tekst, ko, kome, "potvrda", poruka.idVoznje);
      poruka.odgovor = true;
      this.porukaService.getPorukaById(poruka.idPoruke).odgovor =true;

      //voznja je prihvacena i menjaju se podaci o toj voznji
      voznja.brojSlobodnihMesta--;
      //dodaje se novi putnik u podacima za voznju
      voznja.putnici.push(poruka.ko);
      //dodaje se voznja putniku
      this.korisnikService.getKorisnikById(poruka.ko).voznje.push(poruka.idVoznje);
    }else{
      this.snackBar.open("Nemate više mesta. Vožnja je odbijena.");
      this.nePrihvatam(poruka);
    }
  }
  nePrihvatam(poruka):void{
    let naslov:string = "Vožnja nije prihvaćena";
    let tekst:string ="Vaš zahtev za vožnju nije prihvaćen";
    let ko:number = poruka.kome[0];
    let kome:Array<number> = [poruka.ko];
    this.porukaService.posaljiPoruku(naslov,tekst, ko, kome, "potvrda", poruka.idVoznje);
    poruka.odgovor = true;
    this.porukaService.getPorukaById(poruka.idPoruke).odgovor =true;
  }
  oceni(poruka):void{
    poruka.odgovor = true;
    this.porukaService.getPorukaById(poruka.idPoruke).odgovor =true;
  }
}
