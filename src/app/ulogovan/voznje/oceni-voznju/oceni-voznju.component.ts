import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VoznjaService } from '../voznja.service';
import { Voznja } from '../voznja.model';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { Korisnik } from '../../profil/korisnik.model';
import { Ocena } from '../../profil/ocena.model';
import { CookieService } from 'ngx-cookie-service';
import { PorukaService } from '../../obavestenja/poruka.service';

@Component({
  selector: 'app-oceni-voznju',
  templateUrl: './oceni-voznju.component.html',
  styleUrls: ['./oceni-voznju.component.css']
})
export class OceniVoznjuComponent implements OnInit {

  voznja:Voznja;
  vrednostPutnik:number = 3;//kad putnik ocenjuje
  komentarOPrevozniku: string = "";
  vrednost: Array<number> = [];
  komentar: Array<string> = [];
  putnikOcenjuje: boolean;
  putnici: Array<number> = [1];
  imenaPutnika: Array<string> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public podatak:any, private voznjaService:VoznjaService,
            private korisnikService:KorisnikService, private cookieService:CookieService, 
            private porukaService:PorukaService) { }

  ngOnInit() {
    this.voznja = this.voznjaService.getVoznjaById(this.podatak.idVoznje);
    this.putnikOcenjuje = this.podatak.putnikOcenjuje;
    if(!this.putnikOcenjuje){
      this.putnici = this.voznja.putnici;
      this.voznja.putnici.forEach(putnik=>{
        let ime:string = this.korisnikService.getImeById(putnik);
        this.imenaPutnika.push(ime);
        this.vrednost.push(3);
        this.komentar.push("");
      });
    }
  }

  oceni():void{
    if(this.putnikOcenjuje){
      let ocena: number = this.vrednostPutnik;
      let komentar: string = this.komentarOPrevozniku;
      let ko: number = this.korisnikService.getIdByEmail(this.cookieService.get("korisnikEmail"));
      let ocenaKorisnika: Ocena = {ocena, komentar, ko};
      this.korisnikService.getKorisnikById(this.voznja.prevoznik).ocene.push(ocenaKorisnika);
    }else{
      let i: number = 0;
      this.voznja.putnici.forEach(putnik=>{
        let korisnik: Korisnik = this.korisnikService.getKorisnikById(putnik);
        let ocena:number = this.vrednost[i];
        let komentar: string = this.komentar[i];
        let ko:number = this.voznja.prevoznik;
        let ocenaKorisnika:Ocena = {ocena,komentar,ko};
        korisnik.ocene.push(ocenaKorisnika);
      
        //salje se poruka putniku
        let naslov:string = "Završena vožnja";
        let korisnikIme:string = this.cookieService.get("prijavljenKorisnikIme");
        let tekst:string = korisnikIme + " Vam šalje upitnik kako biste ocenili vožnju";
        let koSalje:number = this.voznja.prevoznik;
        let kome:Array<number> = [putnik];
        let idVoznje = this.voznja.id;
        this.porukaService.posaljiPoruku(naslov,tekst, koSalje, kome, "zavrsena", idVoznje);

        i++;
      });
      this.voznja.status = "završena";
    }
  }

}
