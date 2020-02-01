import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-voznje',
  templateUrl: './voznje.component.html',
  styleUrls: ['./voznje.component.css']
})
export class VoznjeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Istorija vožnji");
  }

}
