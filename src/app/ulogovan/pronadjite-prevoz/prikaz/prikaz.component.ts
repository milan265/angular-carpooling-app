import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Voznja } from '../../voznje/voznja.model';
import { PronadjitePrevozComponent } from '../pronadjite-prevoz.component';
import { VoznjaService } from '../../voznje/voznja.service';

@Component({
  selector: 'app-prikaz',
  templateUrl: './prikaz.component.html',
  styleUrls: ['./prikaz.component.css']
})
export class PrikazComponent implements OnInit, AfterViewInit {

  kolone = ['polaziste','odrediste','stajalista','datumPolaska','vremePolaska',
            'vremeDolaska','prevoznik','brojSlobodnihMesta','dodatniDetalji','status','datumObjave'];
  podaciZaTabelu = new MatTableDataSource<Voznja>();

  @ViewChild(MatSort,{static:false}) sort : MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator : MatPaginator;

  constructor(private pronadji:PronadjitePrevozComponent) { }

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
}
