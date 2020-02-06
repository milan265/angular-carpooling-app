import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private titleService: Title, private appComponent:AppComponent, private cookieService: CookieService) { }

  ngOnInit() {
    this.titleService.setTitle("Singidunum Carpooling");
    this.appComponent.brojObavestenja = parseInt(this.cookieService.get('brojObavestenja'));
  }

}
