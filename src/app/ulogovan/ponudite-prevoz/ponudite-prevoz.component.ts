import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ponudite-prevoz',
  templateUrl: './ponudite-prevoz.component.html',
  styleUrls: ['./ponudite-prevoz.component.css']
})
export class PonuditePrevozComponent implements OnInit {

  odredista: Array<string> = ["Danijelova 32", "Kumodraška 261"];
  brojStajalista:number = 1;
  sati: Array<string> = ["00","01","02","03","04","05","06","07","08","09","10","11",
                          "12","13","14","15","16","17","18","19","20","21","22","23"];
  minuti: Array<string> = ["05","10","15","20","25","30","35","40","45","50","55"];
  mesta: Array<number> = [1,2,3];

  prvaFormGrupa: FormGroup;
  drugaFormGrupa: FormGroup;
  
  constructor(private titleService: Title, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.titleService.setTitle("Ponudite prevoz");
    this.prvaFormGrupa = this.formBuilder.group({
        polaziste:['',Validators.required],
        odrediste:['',Validators.required],
        stajaliste1:[''],
        stajaliste2:[''],
        stajaliste3:[''],
        datumPolaska:['',Validators.required],
        vremePolaskaSat:['',Validators.required],
        vremePolaskaMinut:['',Validators.required],
        vremeDolaskaSat:['',Validators.required],
        vremeDolaskaMinut:['',Validators.required]
      });
    this.drugaFormGrupa = this.formBuilder.group({
      brojMesta:['',Validators.required],
      detalji:['']
    });
  }

  dodajStajaliste():void{
    this.brojStajalista++;
  }

  ukloniStajaliste():void{
    this.brojStajalista--;
  }

  objaviVoznju():void{
    console.log(this.prvaFormGrupa);
    console.log(this.drugaFormGrupa);
    console.log("Objava");
  }

}
