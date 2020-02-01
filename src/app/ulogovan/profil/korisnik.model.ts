import { Ocena } from './ocena.model';
import { Voznja } from '../voznje/voznja.model';
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
    automobil:Automobil;
    telefon?: string;
    kratakOpis?: string;
    adresa?: string;
    ocena?: Array<Ocena>;
    voznje?: Array<Voznja>;
    poruke?: Array<Poruka>;
}