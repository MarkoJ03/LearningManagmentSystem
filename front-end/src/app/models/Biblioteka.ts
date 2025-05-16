import { BibliotekaKnjiga } from './BibliotekaKnjiga';

export interface Biblioteka {
  id: number;
  vidljiv: boolean;
  studentska_sluzba_id: number;
  bibliotekaKnjiga?: BibliotekaKnjiga[];
}
