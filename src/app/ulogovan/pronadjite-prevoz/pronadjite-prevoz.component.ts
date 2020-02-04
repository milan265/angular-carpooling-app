import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pronadjite-prevoz',
  templateUrl: './pronadjite-prevoz.component.html',
  styleUrls: ['./pronadjite-prevoz.component.css']
})
export class PronadjitePrevozComponent implements OnInit {

  odredista: Array<string> = ["Danijelova 32", "Kumodraška 261"];
  sati: Array<string> = ["00","01","02","03","04","05","06","07","08","09","10","11",
                          "12","13","14","15","16","17","18","19","20","21","22","23"];
  minuti: Array<string> = ["00","05","10","15","20","25","30","35","40","45","50","55"];

  pretraga: boolean;

  odrediste: string;
  datumPolaska: Date;
  satiOd: number;
  minutiOd: number;
  satiDo: number;
  minutiDo: number;


  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Pronađite prevoz");
    this.pretraga = true;
  }

  onSubmit(form : NgForm){
    this.odrediste = form.value.odrediste;
    this.datumPolaska = form.value.datumPolaska;
    this.satiOd = parseInt(form.value.satiOd);
    this.minutiOd = parseInt(form.value.minutiOd);
    this.satiDo = parseInt(form.value.satiDo);
    this.minutiDo = parseInt(form.value.minutiDo);
    
    this.pretraga = false;
  }
}
