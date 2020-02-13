import { Injectable } from '@angular/core';
import { Korisnik } from '../ulogovan/profil/korisnik.model';
import { Automobil } from '../ulogovan/profil/automobil.model';
import { Ocena } from '../ulogovan/profil/ocena.model';

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
      tip: "putnik",
      automobil: {
        registarskaOznaka: "",
        marka: "",
        model: "",
        godiste: null,
        boja: ""
      },
      voznje:[1,2,3,4,5,6,8,9],
      poruke:[7,5,4,2],
      porukeProcitane:[false,false,true,true],
      ocene:[{
        ocena: 5,
        komentar: "",
        ko: 5
      },
      {
        ocena: 4,
        komentar: "",
        ko: 5
      },
      {
        ocena: 2,
        komentar: "",
        ko: 5
      }]
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
      },
      voznje:[1,3,4],
      telefon: "066123456",
      poruke:[],
      porukeProcitane: [],
      ocene:[]
    },
    {
      id: 3,
      ime: "Milica",
      prezime: "Milić",
      email: "milica.milic.17@mail.rs",
      lozinka: "milica123",
      datumRodjenja: new Date("1997-06-14"),
      datumRegistrovanja: new Date("2020-01-24"),
      tip: "putnik",
      automobil: {
        registarskaOznaka: "",
        marka: "",
        model: "",
        godiste: null,
        boja: ""
      },
      voznje: [1,3,6,7,8,9],
      poruke:[],
      porukeProcitane: [],
      ocene:[]
    },
    {
      id: 4,
      ime: "Mika",
      prezime: "Mikić",
      email: "mika.mikic.18@mail.rs",
      lozinka: "mika12345",
      datumRodjenja: new Date("1998-11-22"),
      datumRegistrovanja: new Date("2020-01-25"),
      tip: "putnik",
      automobil: {
        registarskaOznaka: "",
        marka: "",
        model: "",
        godiste: null,
        boja: ""
      },
      voznje: [3,6,10],
      poruke:[],
      porukeProcitane: [],
      ocene:[]
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
      },
      voznje: [2,5,6,7,8,9],
      telefon: "061456123",
      poruke:[6,3,1],
      porukeProcitane:[false,true,true],
      ocene:[]
    },
    {
      id: 6,
      ime: "Tamara",
      prezime: "Savić",
      email: "tamara.savic.17@mail.rs",
      lozinka: "tamara123",
      datumRodjenja: new Date("1998-05-05"),
      datumRegistrovanja: new Date("2020-02-05"),
      tip: "putnik",
      automobil: {
        registarskaOznaka: "",
        marka: "",
        model: "",
        godiste: null,
        boja: ""
      },
      voznje: [],
      poruke:[],
      porukeProcitane: [],
      ocene:[]
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

  imaAutomobil(email: string):boolean{
    let automobil: boolean;
    KorisnikService.korisnikPodaci.forEach(korisnik=>{
      if(korisnik.email == email){
        automobil = korisnik.automobil.registarskaOznaka!="";
      }
    });
    return automobil;
  }

  getImeByEmail(email:string):string{
    let ime: string;
    KorisnikService.korisnikPodaci.forEach(korisnik=>{
      if(korisnik.email == email){
        ime = korisnik.ime;
      }
    });
    return ime;
  }

  getIdByEmail(email:string):number{
    let id: number;
    KorisnikService.korisnikPodaci.forEach(korisnik=>{
      if(korisnik.email == email){
        id = korisnik.id;
      }
    });
    return id;
  }

  getTipByEmail(email:string):string{
    let tip: string;
    KorisnikService.korisnikPodaci.forEach(korisnik=>{
      if(korisnik.email == email){
        tip = korisnik.tip;
      }
    });
    return tip;
  }

  getImeById(id:number):string{
    return KorisnikService.korisnikPodaci.find(korisnik=>korisnik.id == id).ime;
  }

  getKorisnikById(id:number):Korisnik{
    return KorisnikService.korisnikPodaci.find(korisnik=>korisnik.id == id);
  }

  getKorisnikByEmail(email:string):Korisnik{
    return KorisnikService.korisnikPodaci.find(korisnik=>korisnik.email == email);
  }

  getPorukeByEmail(email:string):Array<number>{
    return KorisnikService.korisnikPodaci.find(korisnik=>korisnik.email == email).poruke;
  }
  getBrojNeprocitanihPoruka(email:string):number{
    let n:number = 0;
    let korisnik: Korisnik = this.getKorisnikByEmail(email);
    korisnik.porukeProcitane.forEach(t=>{
        if(!t){
          n++;
        }
      });
    return n;
  }

  getProcitanePoruke(email:string):Array<boolean>{
    return KorisnikService.korisnikPodaci.find(korisnik=>korisnik.email==email).porukeProcitane;
  }

  setKorisnikById(id:number, ime:string, prezime:string, lozinka:string, datumRodjenja:Date, tip: 'putnik' |'prevoznik',
          telefon?:string, adresa?:string, kratakOpis?:string, automobil?:Automobil):void{
      KorisnikService.korisnikPodaci.forEach(korisnik=>{
        if(korisnik.id == id){
          korisnik.ime = ime;
          korisnik.prezime = prezime;
          korisnik.lozinka = lozinka;
          korisnik.datumRodjenja = datumRodjenja;
          korisnik.tip = tip;
          if(telefon!=undefined){
            korisnik.telefon = telefon;
          }
          if(adresa!=undefined){
            korisnik.adresa = adresa;
          }
          if(kratakOpis!=undefined){
            korisnik.kratakOpis = kratakOpis;
          }
          if(korisnik.tip == 'prevoznik'){
            korisnik.automobil = automobil;
          }
        }
      });
  }

  setVoznju(idKorisnik:number, idVoznja:number):void{
      KorisnikService.korisnikPodaci.find(korisnik=>idKorisnik==korisnik.id).voznje.push(idVoznja);
  }

  setProsecnaOcenaById(id:number){
    let korisnik: Korisnik = this.getKorisnikById(id);
    if(korisnik.ocene.length>0){
      let ocene: Array<number> = korisnik.ocene.map(ocena=>ocena.ocena);
      let zbirOcena: number = ocene.reduce((a,b)=> a+b);
      korisnik.prosecnaOcena = parseFloat((zbirOcena/ocene.length).toFixed(1));  
    }
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
    let automobil: Automobil = {
      registarskaOznaka: "",
      marka: "",
      model: "",
      godiste: null,
      boja: ""
    };
    let voznje:Array<number> = [];
    let poruke:Array<number> = [];
    let ocene:Array<Ocena> = [];
    let porukeProcitane: Array<boolean> = [];
    let korisnik: Korisnik = {id, ime, prezime, email, lozinka, datumRodjenja, datumRegistrovanja, tip, 
                              automobil,ocene,voznje,poruke,porukeProcitane};
    KorisnikService.korisnikPodaci.push(korisnik);
  }
}
