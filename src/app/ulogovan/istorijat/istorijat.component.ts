import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-istorijat',
  templateUrl: './istorijat.component.html',
  styleUrls: ['./istorijat.component.css']
})
export class IstorijatComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Istorija vožnji");
  }

}
