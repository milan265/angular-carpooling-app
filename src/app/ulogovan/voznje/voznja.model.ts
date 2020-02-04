export interface Voznja{
    id: number;
    polaziste: string;
    odrediste: string;
    stajalista: Array<string>;
    datumPolaska:Date;
    vremePolaskaSat: number;
    vremePolaskaMinut: number;
    vremeDolaskaSat: number;
    vremeDolaskaMinut: number;
    prevoznik: number;// korisnik id
    putnici: Array<number>;//niz korisnika id
    brojSlobodnihMesta: number;
    dodatniDetalji: string;
    status: 'završena' | 'tekuća' | 'otkazana';
    datumObjave: Date;
}