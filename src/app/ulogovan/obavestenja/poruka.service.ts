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
      datum: new Date(2020,1,5),
      odgovor: false
    },
    {
      id: 6,
      naslov: "Otkazivanje vožnje",
      tekst: "Milan je otkazao/la vožnju",
      ko: 1,
      kome: [5],
      tip: "otkazao",
      idVoznje: 7,
      datum: new Date(2020,1,4),
      odgovor: false
    },
    {
      id: 5,
      naslov: "Izmenjena vožnja",
      tekst: "Jovana je promenio/la detalje vožnje u kojoj Vi učestvujete",
      ko: 5,
      kome: [1,3,4],
      tip: "izmenjena",
      idVoznje: 6,
      datum: new Date(2020,1,3),
      odgovor: false
    },
    {
      id: 4,
      naslov: "Vožnja nije prihvaćena",
      tekst: "Vaš zahtev za vožnju nije prihvaćen",
      ko: 5,
      kome: [1],
      tip: "potvrda",
      idVoznje: 7,
      datum: new Date(2020,1,2),
      odgovor: false
    },
    {
      id: 3,
      naslov: "Zahtev za vožnju",
      tekst: "Milan Vam šalje zahtev za vožnju",
      ko: 1,
      kome: [5],
      tip: "zahtev",
      idVoznje: 7,
      datum: new Date(2020,1,2),
      odgovor: false
    },
    {
      id: 2,
      naslov: "Prihvaćena vožnja",
      tekst: "Vaš zahtev za vožnju je prihvaćen",
      ko: 5,
      kome: [1],
      tip: 'potvrda',
      idVoznje: 2,
      datum: new Date(2020,1,1),
      odgovor: false
    },
    {
      id: 1,
      naslov: "Zahtev za vožnju",
      tekst: "Milan Vam šalje zahtev za vožnju",
      ko: 1,
      kome: [5],
      tip: 'zahtev',
      idVoznje: 2,
      datum: new Date(2020,1,1),
      odgovor: false
    }
  ];

  constructor(private korisnikService:KorisnikService) { }

  getPorukaById(id:number):Poruka{
    return PorukaService.porukaPodaci.find(poruka=>poruka.id == id);
  }

  posaljiPoruku(naslov:string, tekst:string, ko:number, kome:Array<number>, 
                tip:'zahtev'|'otkazao'|'potvrda'|'izmenjena'|'zavrsena', idVoznje: number):void{
    let maxId: number = 0;
    PorukaService.porukaPodaci.forEach(poruka=>{
        if(maxId < poruka.id){
          maxId = poruka.id;
        }
      }
    );
    let id:number = ++maxId;
    let datum: Date = new Date();
    let odgovor: boolean = false;
    let poruka:Poruka = {id,naslov,tekst,ko,kome,tip,idVoznje,datum,odgovor};
    PorukaService.porukaPodaci.push(poruka);
    kome.forEach(k=>{
      this.korisnikService.getKorisnikById(k).poruke.unshift(id);
      this.korisnikService.getKorisnikById(k).porukeProcitane.unshift(false);
    });
  }
}
