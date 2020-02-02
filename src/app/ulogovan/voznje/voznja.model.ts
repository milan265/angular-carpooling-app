export interface Voznja{
    id: number;
    polaziste: string;
    odrediste: string;
    stajalista: Array<string>;
    vremePolaska: string;
    vremeDolaska: string;
    prevoznik: number;// korisnik id
    putnici: Array<number>;//niz korisnika id
    brojSlobodnihMesta: number;
    dodatniDetalji: string;
    status: 'završena' | 'tekuća' | 'otkazana';
}