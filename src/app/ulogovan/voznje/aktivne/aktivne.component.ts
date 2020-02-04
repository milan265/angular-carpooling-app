import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Voznja } from '../voznja.model';
import { VoznjaService } from '../voznja.service';
import { Korisnik } from '../../profil/korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';

@Component({
  selector: 'app-aktivne',
  templateUrl: './aktivne.component.html',
  styleUrls: ['./aktivne.component.css']
})
export class AktivneComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska',
            'vremeDolaska','prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  @ViewChild(MatSort,{static:false}) sort :MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator :MatPaginator;

  constructor(private cookieService: CookieService, private korisnikService:KorisnikService) { }

  ngOnInit() {
    let email = this.cookieService.get("korisnikEmail");
    let korisnik: Korisnik = this.korisnikService.getKorisnikByEmail(email);

    let voznjaId = VoznjaService.voznjaPodaci.map(v=>v.id);
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

}
