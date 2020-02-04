import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Korisnik } from './korisnik.model';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from 'src/app/auth/korisnik.service';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  promena:boolean = false;
  korisnik:Korisnik;
  email: string;

  vidljivost:string = "visibility_off";
  sakrivenaLozinka:boolean = true;
  tipLozinke:string = "password";

  constructor(private titleService: Title, private cookieService: CookieService, 
    private appComponent:AppComponent, private korisnikService:KorisnikService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.titleService.setTitle("Profil");
    this.email = this.cookieService.get('korisnikEmail');
    this.korisnik = this.korisnikService.getKorisnikByEmail(this.email);
  }

  onSubmit(form : NgForm){
    this.korisnikService.setKorisnikById(this.korisnik.id, this.korisnik.ime, this.korisnik.prezime,
      this.korisnik.lozinka, this.korisnik.datumRodjenja, this.korisnik.tip, this.korisnik.telefon,
      this.korisnik.adresa, this.korisnik.kratakOpis, this.korisnik.automobil);
    this.cookieService.set('prijavljenKorisnikIme', this.korisnik.ime);
    this.appComponent.prijavljenKorisnikIme = this.korisnik.ime;
    this.cookieService.set('tipKorisnika', this.korisnik.tip);
    this.appComponent.tipKorisnika = this.korisnik.tip;
    this.promena = false;
    this.snackBar.open("Promene su sačuvane");
  }

  sakrijLozinku(){
    if(this.sakrivenaLozinka){
      this.sakrivenaLozinka = false;
      this.tipLozinke = "text";
      this.vidljivost = "visibility";
    }else{
      this.sakrivenaLozinka = true;
      this.tipLozinke = "password";
      this.vidljivost = "visibility_off";
    }
  }

}
