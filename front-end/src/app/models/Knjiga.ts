import { BibliotekaKnjiga } from './BibliotekaKnjiga';

export interface Knjiga {
  id: number;
  vidljiv: boolean;
  naziv: string;
  isbn: string;
  bibliotekaKnjiga?: BibliotekaKnjiga[]; 
}
