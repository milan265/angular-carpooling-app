import { Automobil } from './automobil.model';
import { Ocena } from './ocena.model';

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
    ocene?: Array<Ocena>;
    prosecnaOcena?: number;
    voznje?: Array<number>;
    poruke?: Array<number>;
    porukeProcitane?: Array<boolean>;
}