import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { UsloviKoriscenjaComponent } from './auth/registracija/uslovi-koriscenja/uslovi-koriscenja.component';
import { ProfilComponent } from './ulogovan/profil/profil.component';
import { PonuditePrevozComponent } from './ulogovan/ponudite-prevoz/ponudite-prevoz.component';
import { PronadjitePrevozComponent } from './ulogovan/pronadjite-prevoz/pronadjite-prevoz.component';
import { ObavestenjaComponent } from './ulogovan/obavestenja/obavestenja.component';
import { Page404Component } from './page404/page404.component';
import { VoznjeComponent } from './ulogovan/voznje/voznje.component';
import { PrikazComponent } from './ulogovan/pronadjite-prevoz/prikaz/prikaz.component';

const rute: Routes = [
    {path: '', component: PocetnaComponent},
    {path: 'prijava', component: PrijavaComponent},
    {path: 'registracija', component: RegistracijaComponent},
    {path: 'uslovi-koriscenja', component: UsloviKoriscenjaComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'ponudite-prevoz', component: PonuditePrevozComponent},    
    {path: 'pronadjite-prevoz', component: PronadjitePrevozComponent},
    {path: 'voznje', component: VoznjeComponent},
    {path: 'obavestenja', component: ObavestenjaComponent},
    {path: '404', component: Page404Component}
];

@NgModule({
    imports:[RouterModule.forRoot(rute)],
    exports:[RouterModule]
})

export class RoutingModule {}