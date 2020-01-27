import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ulogovan: boolean;

  constructor (private cookieService: CookieService) {}

  ngOnInit(){
    if(this.cookieService.check('ulogovan')){
      if(this.cookieService.get('ulogovan')=='true'){
        this.ulogovan = true;
      }else{
        this.ulogovan = false;
      }
    }else{
      this.cookieService.set( 'ulogovan', 'false');
      this.ulogovan = false;
    }
  }

  prijaviSe(){
    this.cookieService.set('ulogovan','true');
    this.ulogovan = true;
  }
  odjaviSe(){
    this.cookieService.set('ulogovan', 'false');
    this.ulogovan = false;
  }
}
