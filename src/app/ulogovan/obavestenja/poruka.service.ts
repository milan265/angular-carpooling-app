import { Injectable } from '@angular/core';
import { Poruka } from './poruka.model';
import { KorisnikService } from 'src/app/auth/korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class PorukaService {

  static porukaPodaci: Array<Poruka> = [
    {
      id: 7,
      naslov: "Završena vožnja",
      tekst: "Jovana Vam šalje upitnik kako biste ocenili vožnju",
      ko: 5,
      kome: [1],
      tip: "zavrsena",
      idVoznje: 6,
      datum: new Date(2020,1,5)
    },
    {
      id: 6,
      naslov: "Zahtev za vožnju",
      tekst: "Milan je odustao od Vaše vožnje",
      ko: 1,
      kome: [5],
      tip: "odustao",
      idVoznje: 7,
      datum: new Date(2020,1,4)
    },
    {
      id: 5,
      naslov: "Izmenjena vožnja",
      tekst: "Jovana je promenila detalje vožnje u kojoj Vi učestvujete",
      ko: 5,
      kome: [1,3,4],
      tip: "izmenjena",
      idVoznje: 6,
      datum: new Date(2020,1,3)
    },
    {
      id: 4,
      naslov: "Vožnja nije prihvaćena",
      tekst: "Vaš zahtev za vožnju nije prihvaćen",
      ko: 5,
      kome: [1],
      tip: "potvrda",
      idVoznje: 7,
      datum: new Date(2020,1,2)
    },
    {
      id: 3,
      naslov: "Zahtev za vožnju",
      tekst: "Milan Vam šalje zahtev za vožnju",
      ko: 1,
      kome: [5],
      tip: "zahtev",
      idVoznje: 7,
      datum: new Date(2020,1,2)
    },
    {
      id: 2,
      naslov: "Prihvaćena vožnja",
      tekst: "Vaš zahtev za vožnju je prihvaćen",
      ko: 5,
      kome: [1],
      tip: 'potvrda',
      idVoznje: 2,
      datum: new Date(2020,1,1)
    },
    {
      id: 1,
      naslov: "Zahtev za vožnju",
      tekst: "Milan Vam šalje zahtev za vožnju",
      ko: 1,
      kome: [5],
      tip: 'zahtev',
      idVoznje: 2,
      datum: new Date(2020,1,1)
    }
  ];

  constructor(private korisnikService:KorisnikService) { }

  getPorukaById(id:number):Poruka{
    return PorukaService.porukaPodaci.find(poruka=>poruka.id == id);
  }

  posaljiPoruku(naslov:string, tekst:string, ko:number, kome:Array<number>, 
                tip:'zahtev'|'odustao'|'potvrda'|'izmenjena'|'zavrsena', idVoznje: number):void{
    let maxId: number = 0;
    PorukaService.porukaPodaci.forEach(poruka=>{
        if(maxId < poruka.id){
          maxId = poruka.id;
        }
      }
    );
    let id:number = ++maxId;
    let datum: Date = new Date();
    let poruka:Poruka = {id,naslov,tekst,ko,kome,tip,idVoznje,datum};
    PorukaService.porukaPodaci.push(poruka);
    
    this.korisnikService.getKorisnikById(ko).poruke.unshift(id);
    kome.forEach(k=>{
      this.korisnikService.getKorisnikById(k).poruke.unshift(id);
      this.korisnikService.getKorisnikById(k).porukeProcitane.unshift(false);
    });
  }
}
