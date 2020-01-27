export interface Ocena{
    ocena: '1'|'2'|'3'|'4'|'5';
    komentar: string;
    ko: number; /* id korisnika koji daje ocenu */
    kome: number; /* id korisnika koji dobija ocenu */
    tip: 'v' | 'p';/* v- ocena se daje vozacu, p - ocena se daje putniku */
}