import { Fakultet } from './Fakultet';

export interface Univerzitet {
  id: number;
  naziv: string;
  datumOsnivanja: Date;
  adresa_id: number;
  fakulteti?: Fakultet[];
  vidljiv: boolean;
}
