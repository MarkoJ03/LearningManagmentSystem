import { Adresa } from './Adresa';
import { Fakultet } from './Fakultet';

export interface Univerzitet {
  id: number;
  naziv: string;
  datumOsnivanja: Date;
  adresa: Adresa;
  fakulteti?: Fakultet[];
  kontakt: string;
  email:string;
  vidljiv: boolean;
}
