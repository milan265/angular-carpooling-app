import { Injectable } from '@angular/core';
import { Korisnik } from '../ulogovan/profil/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  static korisnikPodaci: Array<Korisnik> = [
    {
      id: 1,
      ime: "Milan",
      prezime: "Savić",
      email: "milan.savic.16@mail.rs",
      lozinka: "milan123",
      datumRodjenja: new Date("1994-05-26"),
      datumRegistrovanja: new Date("2020-01-23"),
      tip: "putnik"
    },
    {
      id: 2,
      ime: "Pera",
      prezime: "Perić",
      email: "pera.peric.17@mail.rs",
      lozinka: "pera12345",
      datumRodjenja: new Date("1998-02-20"),
      datumRegistrovanja: new Date("2020-01-24"),
      tip: "prevoznik",
      automobil: {
        registarskaOznaka: "BG-123-FD",
        marka: "Opel",
        model: "Astra",
        godiste: 2009,
        boja: "bela"
      }
    },
    {
      id: 3,
      ime: "Milica",
      prezime: "Milić",
      email: "milica.milic.17@mail.rs",
      lozinka: "milica123",
      datumRodjenja: new Date("1997-06-14"),
      datumRegistrovanja: new Date("2020-01-24"),
      tip: "putnik"
    },
    {
      id: 4,
      ime: "Mika",
      prezime: "Mikić",
      email: "mika.mikic.18@mail.rs",
      lozinka: "mika12345",
      datumRodjenja: new Date("1998-11-22"),
      datumRegistrovanja: new Date("2020-01-25"),
      tip: "putnik"
    },
    {
      id: 5,
      ime: "Jovana",
      prezime: "Jovanović",
      email: "jovana.jovanovic.17@mail.rs",
      lozinka: "jovana123",
      datumRodjenja: new Date("1997-08-05"),
      datumRegistrovanja: new Date("2020-01-25"),
      tip: "prevoznik",
      automobil: {
        registarskaOznaka: "BG-547-ES",
        marka: "Ford",
        model: "Fiesta",
        godiste: 2012,
        boja: "crvena"
      }
    }
  ]


  constructor() { }

  isKorisnikPostoji(email: string): boolean{
    return KorisnikService.korisnikPodaci.find(korisnik => korisnik.email == email)!=undefined;
  }

  isLozinkaDobra(email: string, lozinka: string): boolean{
    return KorisnikService.korisnikPodaci.find(korisnik => 
      korisnik.email == email && korisnik.lozinka == lozinka) != undefined;
  }

  getImeByEmail(email:string):string{
    let ime:string;
    KorisnikService.korisnikPodaci.forEach(korisnik=>{
      if(korisnik.email == email){
        ime = korisnik.ime;
      }
    });
    return ime;
  }

  registrujKorisnika(ime:string, prezime:string, email:string, lozinka:string, datumRodjenja:Date, tip:'putnik' |'prevoznik'):void{
    let maxId: number = 0;
    KorisnikService.korisnikPodaci.forEach(
      korisnik=>{
        if(maxId < korisnik.id){
          maxId = korisnik.id;
        }
      }
    );
    let id = ++maxId;
    let datumRegistrovanja: Date = new Date();
    let korisnik: Korisnik = {id, ime, prezime, email, lozinka, datumRodjenja, datumRegistrovanja, tip};
    KorisnikService.korisnikPodaci.push(korisnik);
  }
}
