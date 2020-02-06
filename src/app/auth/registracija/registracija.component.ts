import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  vidljivost:string = "visibility_off";
  sakrivenaLozinka:boolean = true;
  tipLozinke:string = "password";

  greska: boolean = false;
  greskaPoruka:string = "";

  constructor(private titleService: Title, private korisnikService: KorisnikService, private router: Router, 
    private cookieService: CookieService, private appComponent:AppComponent, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.titleService.setTitle("Registracija");
  }

  onSubmit(form : NgForm){
    let email: string = form.value.email;
    if(!this.korisnikService.isKorisnikPostoji(email)){
      this.korisnikService.registrujKorisnika(form.value.ime, 
        form.value.prezime,
        email,
        form.value.lozinka,
        form.value.datumRodjenja,
        form.value.tip
        );
        this.appComponent.prijavljenKorisnikIme = this.korisnikService.getImeByEmail(email);
        this.cookieService.set('prijavljenKorisnikIme',this.appComponent.prijavljenKorisnikIme);
        this.appComponent.tipKorisnika = this.korisnikService.getTipByEmail(email);
        this.cookieService.set('tipKorisnika',this.appComponent.tipKorisnika);
        this.cookieService.set('korisnikEmail', email);
        this.cookieService.set('ulogovan','true');
        this.cookieService.set('brojObavestenja','0');
        this.appComponent.ulogovan = true;
        this.router.navigate(['']);
        this.snackBar.open("Uspešno ste se registrovali");
    }else{
      this.greska = true;
      this.greskaPoruka = "Korisnik sa unetom e-mail adresom već postoji."
    }
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
