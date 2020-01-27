export interface Poruka{
    naslov: string;
    tekst: string;
    ko: number; /* id korisnika koji salje poruku */
    kome: number; /* id korisnika koji dobija poruku */
    procitana: boolean; /* da li je poruka procitana */
}