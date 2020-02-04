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
    ocena?: Array<number>;
    voznje?: Array<number>;
    poruke?: Array<number>;
}