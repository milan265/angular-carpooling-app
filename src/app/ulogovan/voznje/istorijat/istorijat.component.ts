import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { VoznjaService } from '../voznja.service';
import { Voznja } from '../voznja.model';
import { Korisnik } from '../../profil/korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { AktivneComponent } from '../aktivne/aktivne.component';

@Component({
  selector: 'app-istorijat',
  templateUrl: './istorijat.component.html',
  styleUrls: ['./istorijat.component.css']
})
export class IstorijatComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska',
            'vremeDolaska','prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  korisnik:Korisnik;
  stajalista:string = "";

  @ViewChild(MatSort,{static:false}) sort : MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator : MatPaginator;

  constructor(private cookieService: CookieService, private korisnikService:KorisnikService, private router: Router) { }

  ngOnInit() {
    let email = this.cookieService.get("korisnikEmail");
    this.korisnik= this.korisnikService.getKorisnikByEmail(email);
    this.podaciZaTabelu.sortingDataAccessor = (item, property) => {
      if (property === 'vremePolaska') {
        return item.vremeDolaskaSat + ":" + item.vremePolaskaMinut;
      } 
      if(property === 'vremeDolaska'){
        return item.vremeDolaskaSat + ":" + item.vremeDolaskaMinut;
      }
      return item[property];
      
    };
    
    this.podaciZaTabelu.data = this.getSveVoznje();
  }

  ngAfterViewInit(){
    this.podaciZaTabelu.sort = this.sort;
    this.podaciZaTabelu.paginator = this.paginator;
  }

  getSveVoznje():Array<Voznja>{
    let sveVoznje:Array<Voznja> = [];
    this.korisnik.voznje.forEach(e=>sveVoznje.push(VoznjaService.voznjaPodaci.find(v=>e == v.id)));
    return sveVoznje;
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
    this.korisnikService.setProsecnaOcenaById(id);
    let korisnik: Korisnik = this.korisnikService.getKorisnikById(id);
    let prosecnaOcena: any = korisnik.prosecnaOcena==undefined? "/":korisnik.prosecnaOcena;
    let poruka: string = "Ime: " + korisnik.ime + "\n" + 
                          "Prezime: " + korisnik.prezime + "\n" +
                          "E-mail: " + korisnik.email + "\n" +
                          "Telefon: " + korisnik.telefon + "\n" +
                          "Ocena: " + prosecnaOcena + "\n" +
                          "Automobil \n" + 
                          "Marka: " + korisnik.automobil.marka + "\n" +
                          "Model: " + korisnik.automobil.model + "\n" +
                          "Boja: " + korisnik.automobil.boja + "\n" +
                          "Registarska oznaka: " + korisnik.automobil.registarskaOznaka + "\n";
    return poruka;
  }

  filterTabele(v:string):void{
    this.podaciZaTabelu.filter = v.trim().toLocaleLowerCase();
  }
}
