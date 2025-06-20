import { BibliotekaKnjiga } from './BibliotekaKnjiga';

export interface Knjiga {
  id: number;
  naziv: string;
  isbn: string;
  bibliotekaKnjiga?: BibliotekaKnjiga[];
  vidljiv: boolean;
}
