export interface Voznja{
    id: number;
    naziv: string;
    polaziste: string;
    odrediste: string;
    stajalista: Array<string>;
    vremePolaska: string;
    vremeDolaska: string;
    prevoznik: number;// korisnik id
    putnici: Array<number>;//niz korisnika id
    brojSlobodnihMesta: number;
    status: 'završena' | 'tekuća' | 'otkazana';
}