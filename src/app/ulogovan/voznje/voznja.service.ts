import { Injectable } from '@angular/core';
import { Voznja } from './voznja.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { KorisnikService } from 'src/app/auth/korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class VoznjaService {
  static voznjaPodaci: Array<Voznja>= [
    {
      id: 1,
      polaziste: "Resavska 3",
      odrediste: "Kumodraška 261",
      stajalista: [ "Autokomanda", "Dušanovac"],
      datumPolaska: new Date(2020,0,28),
      vremePolaskaSat: 10,
      vremePolaskaMinut: 10,
      vremeDolaskaSat: 10,
      vremeDolaskaMinut: 45,
      prevoznik:2,
      putnici: [1,3],
      brojSlobodnihMesta: 1,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,0,27)
    },
    {
      id: 2,
      polaziste: "Tašmajdan",
      odrediste: "Danijelova 32",
      stajalista: ["Čubura"],
      datumPolaska: new Date(2020,0,28),
      vremePolaskaSat: 13,
      vremePolaskaMinut: 15,
      vremeDolaskaSat: 13,
      vremeDolaskaMinut: 45,
      prevoznik: 5,
      putnici: [1],
      brojSlobodnihMesta: 2,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,0,27)
    },
    {
      id: 3,
      polaziste: "Bulevar despota Stefana 25",
      odrediste: "Danijelova 32",
      stajalista: ["Crveni krst"],
      datumPolaska: new Date(2020,1,3),
      vremePolaskaSat: 15,
      vremePolaskaMinut: 10,
      vremeDolaskaSat: 15,
      vremeDolaskaMinut: 45,
      prevoznik:2,
      putnici: [1,3,4],
      brojSlobodnihMesta: 0,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,1,1)
    },
    {
      id: 4,
      polaziste: "Resavska 3",
      odrediste: "Kumodraška 261",
      stajalista: [ "Autokomanda", "Dušanovac"],
      datumPolaska: new Date(2020,1,4),
      vremePolaskaSat: 12,
      vremePolaskaMinut: 25,
      vremeDolaskaSat: 12,
      vremeDolaskaMinut: 55,
      prevoznik: 2,
      putnici: [1],
      brojSlobodnihMesta: 2,
      dodatniDetalji: "",
      status: 'otkazana',
      datumObjave: new Date(2020,1,2)
    },
    {
      id: 5,
      polaziste: "Tašmajdan",
      odrediste: "Kumodraška 261",
      stajalista:[],
      datumPolaska: new Date(2020,1,4),
      vremePolaskaSat: 10,
      vremePolaskaMinut: 15,
      vremeDolaskaSat: 10,
      vremeDolaskaMinut: 55,
      prevoznik: 5,
      putnici: [1],
      brojSlobodnihMesta: 2,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,1,3)
    },
    {
      id: 6,
      polaziste: "Tašmajdan",
      odrediste: "Danijelova 32",
      stajalista: ["Čubura"],
      datumPolaska: new Date(2020,1,5),
      vremePolaskaSat: 13,
      vremePolaskaMinut: 20,
      vremeDolaskaSat: 13,
      vremeDolaskaMinut: 45,
      prevoznik: 5,
      putnici: [1,3,4],
      brojSlobodnihMesta: 0,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,1,4)
    },
    {
      id: 7,
      polaziste: "Dorćol",
      odrediste: "Kumodraška 261",
      stajalista: ["Čubura"],
      datumPolaska: new Date(2020,1,7),
      vremePolaskaSat: 11,
      vremePolaskaMinut: 15,
      vremeDolaskaSat: 11,
      vremeDolaskaMinut: 45,
      prevoznik: 5,
      putnici: [3],
      brojSlobodnihMesta: 1,
      dodatniDetalji: "",
      status: 'završena',
      datumObjave: new Date(2020,1,5)
    },
    {
      id: 8,
      polaziste: "Dorćol",
      odrediste: "Kumodraška 261",
      stajalista: ["Čubura"],
      datumPolaska: new Date(2020,1,7),
      vremePolaskaSat: 18,
      vremePolaskaMinut: 15,
      vremeDolaskaSat: 18,
      vremeDolaskaMinut: 45,
      prevoznik: 5,
      putnici: [1,3],
      brojSlobodnihMesta: 1,
      dodatniDetalji: "",
      status: 'tekuća',
      datumObjave: new Date(2020,1,5)
    },
    {
      id: 9,
      polaziste: "Dorćol",
      odrediste: "Danijelova 32",
      stajalista: [],
      datumPolaska: new Date(2020,1,7),
      vremePolaskaSat: 17,
      vremePolaskaMinut: 10,
      vremeDolaskaSat: 17,
      vremeDolaskaMinut: 45,
      prevoznik: 5,
      putnici: [1,3],
      brojSlobodnihMesta: 1,
      dodatniDetalji: "",
      status: 'tekuća',
      datumObjave: new Date(2020,1,5)
    },
    {
      id: 10,
      polaziste: "Tašmajdan",
      odrediste: "Danijelova 32",
      stajalista: ["Čubura"],
      datumPolaska: new Date(2020,1,7),
      vremePolaskaSat: 17,
      vremePolaskaMinut: 15,
      vremeDolaskaSat: 17,
      vremeDolaskaMinut: 50,
      prevoznik: 2,
      putnici: [4],
      brojSlobodnihMesta: 2,
      dodatniDetalji: "",
      status: 'tekuća',
      datumObjave: new Date(2020,1,5)
    }

  ];

  constructor(private router:Router, private snackBar:MatSnackBar, private korisnikService:KorisnikService) { }


  getPrevoznikById(id:number):number{
    return VoznjaService.voznjaPodaci.find(voznja=>voznja.id==id).prevoznik;
  }

  dodajVoznju(prevoznik:number, polaziste:string, odrediste:string, stajaliste1:string, stajaliste2:string, stajaliste3:string,
    datumPolaska:Date, satOd:string, minutOd:string, satDo:string, minutDo:string,
    brojSlobodnihMesta:number, dodatniDetalji:string):void{
      let maxId: number = 0;
      VoznjaService.voznjaPodaci.forEach(
          voznja=>{
          if(maxId < voznja.id){
            maxId = voznja.id;
          }
        }
      );
      let id = ++maxId;

      let stajalista: Array<string> = [stajaliste1,stajaliste2,stajaliste3];
      let vremePolaskaSat: number = parseInt(satOd);
      let vremePolaskaMinut: number = parseInt(minutOd);
      let vremeDolaskaSat: number = parseInt(satDo);
      let vremeDolaskaMinut: number = parseInt(minutDo);
      let putnici: Array<number> = [];
      let status:'završena' | 'tekuća' | 'otkazana' = "tekuća";
      let datumObjave: Date = new Date();

      let voznja:Voznja = {id,polaziste,odrediste,stajalista,datumPolaska,vremePolaskaSat,vremePolaskaMinut,
        vremeDolaskaSat,vremeDolaskaMinut,prevoznik,putnici,brojSlobodnihMesta,dodatniDetalji,status, datumObjave};
      VoznjaService.voznjaPodaci.unshift(voznja);

      this.korisnikService.setVoznju(prevoznik,id);
      
      this.router.navigate(['voznje']);
      this.snackBar.open("Vožnja je objavljena");
  }

}
