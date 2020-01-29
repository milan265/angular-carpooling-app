import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  vidljivost:string = "visibility_off";
  sakrivenaLozinka:boolean = true;
  tipLozinke:string = "password";

  greska: boolean = false;
  greskaPoruka:string = "";

  constructor(private titleService: Title, private korisnikService: KorisnikService, private router: Router, 
    private cookieService: CookieService, private appComponent:AppComponent, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.titleService.setTitle("Prijava");
  }

  onSubmit(form: NgForm){
    if(!this.korisnikService.isLozinkaDobra(form.value.email, form.value.lozinka)){
      this.greska = true;
      this.greskaPoruka = "Korisnik sa unetim podacima ne postoji.";
      return
    }
    this.greska = false;
    this.appComponent.prijavljenKorisnikIme = this.korisnikService.getImeByEmail(form.value.email);
    this.cookieService.set('ulogovan','true');
    this.appComponent.ulogovan = true;
    this.router.navigate(['']);
    this.snackBar.open("Prijavljeni ste");
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
