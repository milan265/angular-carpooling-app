import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { VoznjaService } from '../voznja.service';
import { Voznja } from '../voznja.model';
import { Korisnik } from '../../profil/korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-istorijat',
  templateUrl: './istorijat.component.html',
  styleUrls: ['./istorijat.component.css']
})
export class IstorijatComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska',
            'vremeDolaska','prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  @ViewChild(MatSort,{static:false}) sort : MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator : MatPaginator;

  constructor(private cookieService: CookieService, private korisnikService:KorisnikService) { }

  ngOnInit() {
    let email = this.cookieService.get("korisnikEmail");
    let korisnik: Korisnik = this.korisnikService.getKorisnikByEmail(email);

    let voznjaId = VoznjaService.voznjaPodaci.map(v=>v.id);
    let sveVoznje: Array<Voznja> = [];
    korisnik.voznje.forEach(e=>sveVoznje.push(VoznjaService.voznjaPodaci.find(v=>e == v.id)));
    
    this.podaciZaTabelu.data = sveVoznje;
  }

  ngAfterViewInit(){
    this.podaciZaTabelu.sort = this.sort;
    this.podaciZaTabelu.paginator = this.paginator;
  }

}
