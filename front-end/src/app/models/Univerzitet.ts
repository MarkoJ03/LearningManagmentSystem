import { Adresa } from './Adresa';
import { Fakultet } from './Fakultet';

export interface Univerzitet {
  id: number;
  naziv: string;
  datumOsnivanja: Date;
  adresa: Adresa;
  fakulteti?: Fakultet[];
  email: string;
  kontakt: string;
  vidljiv: boolean;
}
