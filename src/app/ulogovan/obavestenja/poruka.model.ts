export interface Poruka{
    id: number;
    naslov: string;
    tekst: string;
    ko: number; /* id korisnika koji salje poruku */
    kome: Array<number>; /* id korisnika koji dobijaju poruku */
    tip: 'zahtev'|'odustao'|'potvrda'|'izmenjena'|'zavrsena';
    idVoznje: number;
    datum: Date;
}