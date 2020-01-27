import { Ocena } from './ocena.model';
import { Voznja } from '../istorijat/voznja.model';
import { Poruka } from '../obavestenja/poruka.model';

export interface Korisnik{
    id: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    datumRodjenja: Date;
    tip: 'putnik' |'prevoznik'| null;
    telefon?: string;
    kratakOpis?: string;
    adresa?: string;
    automobil?:string;
    ocena?: Array<Ocena>;
    voznje?: Array<Voznja>;
    poruke?: Array<Poruka>;
}