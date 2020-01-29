import { Ocena } from './ocena.model';
import { Voznja } from '../istorijat/voznja.model';
import { Poruka } from '../obavestenja/poruka.model';
import { Automobil } from './automobil.model';

export interface Korisnik{
    id: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    datumRodjenja: Date;
    datumRegistrovanja: Date;
    tip: 'putnik' |'prevoznik';
    telefon?: string;
    kratakOpis?: string;
    adresa?: string;
    automobil?:Automobil;
    ocena?: Array<Ocena>;
    voznje?: Array<Voznja>;
    poruke?: Array<Poruka>;
}