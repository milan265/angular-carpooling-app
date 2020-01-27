import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pronadjite-prevoz',
  templateUrl: './pronadjite-prevoz.component.html',
  styleUrls: ['./pronadjite-prevoz.component.css']
})
export class PronadjitePrevozComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Pronađite prevoz");
  }

}
