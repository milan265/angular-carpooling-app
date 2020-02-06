import { Component, OnInit, Inject } from '@angular/core';
import { VoznjaService } from '../../voznja.service';
import { Voznja } from '../../voznja.model';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PorukaService } from 'src/app/ulogovan/obavestenja/poruka.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-izmena',
  templateUrl: './izmena.component.html',
  styleUrls: ['./izmena.component.css']
})
export class IzmenaComponent implements OnInit {

  voznja:Voznja;

  polaziste: string;
  odrediste: string;
  stajalista: Array<string>;
  datumPolaska:Date;
  vremePolaskaSat: string;
  vremePolaskaMinut: string;
  vremeDolaskaSat: string;
  vremeDolaskaMinut: string;
  brojSlobodnihMesta: number;
  dodatniDetalji: string;
  status: 'završena' | 'tekuća' | 'otkazana';

  sati: Array<string> = ["00","01","02","03","04","05","06","07","08","09","10","11",
                          "12","13","14","15","16","17","18","19","20","21","22","23"];
  minuti: Array<string> = ["00","05","10","15","20","25","30","35","40","45","50","55"];
  mesta: Array<number> = [1,2,3];
  statusi: Array<string> = ["tekuća","otkazana"];
  
  constructor(@Inject(MAT_DIALOG_DATA) public podatak:any, private voznjaService:VoznjaService, 
              private porukaService:PorukaService,private snackBar:MatSnackBar, private cookieService:CookieService) { }

  ngOnInit() {
    this.voznja = this.voznjaService.getVoznjaById(this.podatak.idVoznje);
    this.polaziste = this.voznja.polaziste;
    this.odrediste = this.voznja.odrediste;
    this.stajalista = this.voznja.stajalista;
    this.datumPolaska = this.voznja.datumPolaska;
    this.vremePolaskaSat = this.voznja.vremePolaskaSat + "";
    this.vremePolaskaMinut = this.voznja.vremePolaskaMinut + "";
    this.vremeDolaskaSat = this.voznja.vremeDolaskaSat + "";
    this.vremeDolaskaMinut = this.voznja.vremeDolaskaMinut + "";
    this.brojSlobodnihMesta = this.voznja.brojSlobodnihMesta;
    this.dodatniDetalji = this.voznja.dodatniDetalji;
    this.status = this.voznja.status;
  }

  sacuvaj(){
    if(this.polaziste!="" && this.odrediste!="" && this.datumPolaska!=null){
      this.voznja.polaziste = this.polaziste;
      this.voznja.odrediste = this.odrediste;
      this.voznja.stajalista = this.stajalista;
      this.voznja.datumPolaska = this.datumPolaska;
      this.voznja.vremePolaskaSat = parseInt(this.vremePolaskaSat);
      this.voznja.vremePolaskaMinut = parseInt(this.vremePolaskaMinut);
      this.voznja.vremeDolaskaSat = parseInt(this.vremeDolaskaSat);
      this.voznja.vremeDolaskaMinut = parseInt(this.vremeDolaskaMinut);
      this.voznja.brojSlobodnihMesta = this.brojSlobodnihMesta;
      this.voznja.dodatniDetalji = this.dodatniDetalji;
      this.voznja.status = this.status;

      let naslov:string = "Izmenjena vožnja";
      let korisnikIme:string = this.cookieService.get("prijavljenKorisnikIme");
      let tekst:string = korisnikIme + " je promenio/la detalje vožnje u kojoj Vi učestvujete";
      let ko:number = this.voznja.prevoznik;
      let kome:Array<number> = this.voznja.putnici;
      let id:number = this.voznja.id;
      this.porukaService.posaljiPoruku(naslov,tekst, ko, kome, "izmenjena", id);
    }else{
      this.snackBar.open("Podaci nisu sačuvani. Označena polja moraju biti popunjena.");
    }
  }

}
