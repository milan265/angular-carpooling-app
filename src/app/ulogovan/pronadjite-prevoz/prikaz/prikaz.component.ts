import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Voznja } from '../../voznje/voznja.model';
import { PronadjitePrevozComponent } from '../pronadjite-prevoz.component';
import { VoznjaService } from '../../voznje/voznja.service';
import { Korisnik } from '../../profil/korisnik.model';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { PorukaService } from '../../obavestenja/poruka.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-prikaz',
  templateUrl: './prikaz.component.html',
  styleUrls: ['./prikaz.component.css']
})
export class PrikazComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska','vremeDolaska',
            'prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave','rezervisi'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  stajalista:string = "";

  @ViewChild(MatSort,{static:false}) sort : MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator : MatPaginator;

  constructor(private pronadji:PronadjitePrevozComponent, private korisnikService: KorisnikService, 
    private porukaService:PorukaService, private voznjaService:VoznjaService,private snackBar:MatSnackBar, private cookieService:CookieService) { }

  ngOnInit() {
    this.podaciZaTabelu.data = VoznjaService.voznjaPodaci.filter(voznja=>{
      let vremeDolaskaUMin: number = voznja.vremeDolaskaSat*60 + voznja.vremeDolaskaMinut;
      let putnikOd: number = this.pronadji.satiOd*60 + this.pronadji.minutiOd;
      let putnikDo: number = this.pronadji.satiDo*60 + this.pronadji.minutiDo;
      let vreme: boolean = putnikOd<=vremeDolaskaUMin && vremeDolaskaUMin<=putnikDo;
      return voznja.odrediste==this.pronadji.odrediste && vreme && voznja.status=="tekuća" &&
      voznja.datumPolaska.toLocaleDateString()==this.pronadji.datumPolaska.toLocaleDateString() && voznja.brojSlobodnihMesta>0 ;
    });
  }

  ngAfterViewInit(){
    this.podaciZaTabelu.sort = this.sort;
    this.podaciZaTabelu.paginator = this.paginator;
  }

  vratiPretragu():void{
    this.pronadji.pretraga = true;
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
  posaljiZahtevZaVoznju(id:number):void{
    let naslov:string = "Zahtev za vožnju";
    let email:string = this.cookieService.get("korisnikEmail");
    let korisnikIme:string = this.korisnikService.getImeByEmail(email);
    let tekst:string = korisnikIme + " Vam šalje zahtev za vožnju";
    let ko:number = this.korisnikService.getIdByEmail(email);
    let kome:Array<number> = [];
    kome.push(this.voznjaService.getPrevoznikById(id));
    this.porukaService.posaljiPoruku(naslov,tekst, ko, kome, "zahtev", id);
    this.snackBar.open('Uspešno ste poslali zahtev za vožnju');
  }

  filterTabele(v:string):void{
    this.podaciZaTabelu.filter = v.trim().toLocaleLowerCase();
  }
}

