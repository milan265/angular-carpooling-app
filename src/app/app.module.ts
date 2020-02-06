import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 

import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsloviKoriscenjaComponent } from './auth/registracija/uslovi-koriscenja/uslovi-koriscenja.component';
import { ProfilComponent } from './ulogovan/profil/profil.component';
import { ObavestenjaComponent } from './ulogovan/obavestenja/obavestenja.component';
import { PronadjitePrevozComponent } from './ulogovan/pronadjite-prevoz/pronadjite-prevoz.component';
import { PonuditePrevozComponent } from './ulogovan/ponudite-prevoz/ponudite-prevoz.component';
import { CookieService } from 'ngx-cookie-service';
import { KorisnikService } from './auth/korisnik.service';
import { Page404Component } from './page404/page404.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { VoznjeComponent } from './ulogovan/voznje/voznje.component';
import { AktivneComponent } from './ulogovan/voznje/aktivne/aktivne.component';
import { IstorijatComponent } from './ulogovan/voznje/istorijat/istorijat.component';
import { VoznjaService } from './ulogovan/voznje/voznja.service';
import { PrikazComponent } from './ulogovan/pronadjite-prevoz/prikaz/prikaz.component';
import { PorukaService } from './ulogovan/obavestenja/poruka.service';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    UsloviKoriscenjaComponent,
    ProfilComponent,
    ObavestenjaComponent,
    PronadjitePrevozComponent,
    PonuditePrevozComponent,
    Page404Component,
    VoznjeComponent,
    AktivneComponent,
    IstorijatComponent,
    PrikazComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,KorisnikService,VoznjaService,PorukaService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
