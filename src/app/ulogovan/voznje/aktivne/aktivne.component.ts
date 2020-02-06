import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Voznja } from '../voznja.model';
import { VoznjaService } from '../voznja.service';
import { Korisnik } from '../../profil/korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aktivne',
  templateUrl: './aktivne.component.html',
  styleUrls: ['./aktivne.component.css']
})
export class AktivneComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska','vremeDolaska',
            'prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave','izmena'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  stajalista:string = "";
  tipKorisnika:string;

  @ViewChild(MatSort,{static:false}) sort :MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator :MatPaginator;

  constructor(private cookieService: CookieService, private korisnikService:KorisnikService, private router: Router,
      private snackBar:MatSnackBar) { }

  ngOnInit() {
    let email = this.cookieService.get("korisnikEmail");
    let korisnik: Korisnik = this.korisnikService.getKorisnikByEmail(email);
    this.tipKorisnika = this.cookieService.get('tipKorisnika');

    let sveAktivneVoznje: Array<Voznja> = [];
    korisnik.voznje.forEach(e=>{
      let p = VoznjaService.voznjaPodaci.find(v=>e == v.id && v.status=="tekuća");
      if(p != undefined){
        sveAktivneVoznje.push(p);
      }
    });
    this.podaciZaTabelu.data = sveAktivneVoznje;

  }

  ngAfterViewInit(){
    this.podaciZaTabelu.sort = this.sort;
    this.podaciZaTabelu.paginator = this.paginator;
  }

  pronadjiVoznju(){
    this.router.navigate(['pronadjite-prevoz']);
  }

  prikaziStajalista(s:Array<string>):string{
    this.stajalista = "";
    s.forEach(e=>this.stajalista += e + "\n" );
    return this.stajalista;
  }

  prikaziPrevoznikaIme(id: number):string{
    return this.korisnikService.getImeById(id);
  }

  prikaziPrevoznika(id:number):string{
    let korisnik: Korisnik = this.korisnikService.getKorisnikById(id);
    let poruka: string = "Ime: " + korisnik.ime + "\n" + 
                          "Prezime: " + korisnik.prezime + "\n" +
                          "E-mail: " + korisnik.email + "\n" +
                          "Telefon: " + korisnik.telefon + "\n" +
                          "Ocena: " + korisnik.prosecnaOcena + "\n" +
                          "Automobil \n" + 
                          "Marka: " + korisnik.automobil.marka + "\n" +
                          "Model: " + korisnik.automobil.model + "\n" +
                          "Boja: " + korisnik.automobil.boja + "\n" +
                          "Registarska oznaka: " + korisnik.automobil.registarskaOznaka + "\n";
    return poruka;
  }

  izmeniVoznju(id:number):void{
    
  }
  zavrsiVoznju(id:number):void{
    
  }
  otkaziVoznju(id:number):void{

    this.snackBar.open("Uspešno ste otkazali vožnju");
  }

  filterTabele(v:string):void{
    this.podaciZaTabelu.filter = v.trim().toLocaleLowerCase();
  }
}
