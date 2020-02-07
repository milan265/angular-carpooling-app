import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Voznja } from '../voznja.model';
import { VoznjaService } from '../voznja.service';
import { Korisnik } from '../../profil/korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { Router } from '@angular/router';
import { PorukaService } from '../../obavestenja/poruka.service';
import { IzmenaComponent } from './izmena/izmena.component';
import { OceniVoznjuComponent } from '../oceni-voznju/oceni-voznju.component';

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
  korisnik:Korisnik;

  @ViewChild(MatSort,{static:false}) sort :MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator :MatPaginator;

  constructor(private cookieService: CookieService, private korisnikService:KorisnikService, private router: Router,
      private voznjaService:VoznjaService, private porukaService:PorukaService, private snackBar:MatSnackBar,
      private dialog: MatDialog) { }

  ngOnInit() {
    let email = this.cookieService.get("korisnikEmail");
    this.korisnik = this.korisnikService.getKorisnikByEmail(email);
    this.tipKorisnika = this.cookieService.get('tipKorisnika');

    this.podaciZaTabelu.sortingDataAccessor = (item, property) => {
      if (property === 'vremePolaska') {
        return item.vremeDolaskaSat + ":" + item.vremePolaskaMinut;
      } 
      if(property === 'vremeDolaska'){
        return item.vremeDolaskaSat + ":" + item.vremeDolaskaMinut;
      }
      return item[property];
      
    };

    this.podaciZaTabelu.data = this.getSveAktivneVoznje();
  }

  ngAfterViewInit(){
    this.podaciZaTabelu.sort = this.sort;
    this.podaciZaTabelu.paginator = this.paginator;
  }

  getSveAktivneVoznje():Array<Voznja>{
    let sveAktivneVoznje = [];
    this.korisnik.voznje.forEach(e=>{
      let p = VoznjaService.voznjaPodaci.find(v=>e == v.id && v.status=="tekuća");
      if(p != undefined){
        sveAktivneVoznje.push(p);
      }
    });
    return sveAktivneVoznje;
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

  izmeniVoznju(id:number):void{
    this.dialog.open(IzmenaComponent,{
      data:{
        idVoznje:id
      }
    });
  }
  zavrsiVoznju(id:number):void{
    const dialogRef = this.dialog.open(OceniVoznjuComponent,{
      data:{
        idVoznje:id,
        putnikOcenjuje:false
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.podaciZaTabelu.data = this.getSveAktivneVoznje();
      }
    });
    
  }
  otkaziVoznju(id:number):void{
    let naslov:string = "Otkazivanje vožnje";
    let email:string = this.cookieService.get("korisnikEmail");
    let korisnikIme:string = this.korisnikService.getImeByEmail(email);
    let tekst:string = korisnikIme + " je otkazao/la vožnju";
    let ko:number = this.korisnikService.getIdByEmail(email);
    let kome:Array<number> = [];
    kome.push(this.voznjaService.getPrevoznikById(id));
    this.porukaService.posaljiPoruku(naslov,tekst, ko, kome, "otkazao", id);

    //uklanja se voznja iz niza voznji
    let korisnik: Korisnik = this.korisnikService.getKorisnikByEmail(email);
    let indeks = korisnik.voznje.indexOf(id);
    korisnik.voznje.splice(indeks,1);
    this.voznjaService.oslobodiMesto(id);
  
    //u podatke za tabelu upisemo aktivne voznje
    this.podaciZaTabelu.data = this.getSveAktivneVoznje();

    this.snackBar.open("Uspešno ste otkazali vožnju");
  }

  filterTabele(v:string):void{
    this.podaciZaTabelu.filter = v.trim().toLocaleLowerCase();
  }
}
