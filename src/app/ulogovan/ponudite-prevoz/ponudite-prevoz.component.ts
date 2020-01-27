import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ponudite-prevoz',
  templateUrl: './ponudite-prevoz.component.html',
  styleUrls: ['./ponudite-prevoz.component.css']
})
export class PonuditePrevozComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Ponudite prevoz");
  }

}
