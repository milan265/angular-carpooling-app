import { Korisnik } from '../profil/korisnik.model';

export interface Voznja{
    id: number;
    naziv: string;
    polaziste: string;
    odrediste: string;
    stajalista: Array<string>;
    vremePolaska: string;
    vremeDolaska: string;
    prevoznik: Korisnik;
    putnici: Array<Korisnik>;
    brojSlobodnihMesta: number;
    status: 'završena' | 'tekuća' | 'otkazana';
}