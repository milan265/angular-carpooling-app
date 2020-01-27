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
import { FormsModule } from '@angular/forms';
import { UsloviKoriscenjaComponent } from './auth/registracija/uslovi-koriscenja/uslovi-koriscenja.component';
import { ProfilComponent } from './ulogovan/profil/profil.component';
import { IstorijatComponent } from './ulogovan/istorijat/istorijat.component';
import { ObavestenjaComponent } from './ulogovan/obavestenja/obavestenja.component';
import { PronadjitePrevozComponent } from './ulogovan/pronadjite-prevoz/pronadjite-prevoz.component';
import { PonuditePrevozComponent } from './ulogovan/ponudite-prevoz/ponudite-prevoz.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    UsloviKoriscenjaComponent,
    ProfilComponent,
    IstorijatComponent,
    ObavestenjaComponent,
    PronadjitePrevozComponent,
    PonuditePrevozComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
