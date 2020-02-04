import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VoznjaService } from '../voznje/voznja.service';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ponudite-prevoz',
  templateUrl: './ponudite-prevoz.component.html',
  styleUrls: ['./ponudite-prevoz.component.css']
})
export class PonuditePrevozComponent implements OnInit {

  odredista: Array<string> = ["Danijelova 32", "Kumodraška 261"];
  brojStajalista:number = 1;
  sati: Array<string> = ["00","01","02","03","04","05","06","07","08","09","10","11",
                          "12","13","14","15","16","17","18","19","20","21","22","23"];
  minuti: Array<string> = ["00","05","10","15","20","25","30","35","40","45","50","55"];
  mesta: Array<number> = [1,2,3];

  prvaFormGrupa: FormGroup;
  drugaFormGrupa: FormGroup;

  idVozaca: number;
  automobil: boolean = false;
  
  constructor(private titleService: Title, private formBuilder:FormBuilder, private voznjaService: VoznjaService, 
      private cookieService:CookieService, private korisnikService:KorisnikService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.titleService.setTitle("Ponudite prevoz");
    let email = this.cookieService.get('korisnikEmail');
    this.idVozaca = this.korisnikService.getIdByEmail(email);
    this.automobil = this.korisnikService.imaAutomobil(email);
    this.prvaFormGrupa = this.formBuilder.group({
        polaziste:['',Validators.required],
        odrediste:['',Validators.required],
        stajaliste1:[''],
        stajaliste2:[''],
        stajaliste3:[''],
        datumPolaska:['',Validators.required],
        vremePolaskaSat:['',Validators.required],
        vremePolaskaMinut:['',Validators.required],
        vremeDolaskaSat:['',Validators.required],
        vremeDolaskaMinut:['',Validators.required]
      });
    this.drugaFormGrupa = this.formBuilder.group({
      brojMesta:['',Validators.required],
      detalji:['']
    });
  }

  dodajStajaliste():void{
    this.brojStajalista++;
  }

  ukloniStajaliste():void{
    this.brojStajalista--;
  }

  objaviVoznju():void{
    if(this.drugaFormGrupa.value.brojMesta!="" && this.automobil){
      this.voznjaService.dodajVoznju(
          this.idVozaca,
          this.prvaFormGrupa.value.polaziste,
          this.prvaFormGrupa.value.odrediste,
          this.prvaFormGrupa.value.stajaliste1,
          this.prvaFormGrupa.value.stajaliste2,
          this.prvaFormGrupa.value.stajaliste3,
          this.prvaFormGrupa.value.datumPolaska,
          this.prvaFormGrupa.value.vremePolaskaSat,
          this.prvaFormGrupa.value.vremePolaskaMinut,
          this.prvaFormGrupa.value.vremeDolaskaSat,
          this.prvaFormGrupa.value.vremeDolaskaMinut,
          this.drugaFormGrupa.value.brojMesta,
          this.drugaFormGrupa.value.detalji
          );
    }
  }

}
