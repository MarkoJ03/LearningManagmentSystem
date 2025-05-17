import { BibliotekaKnjiga } from './BibliotekaKnjiga';
import { StudentskaSluzba } from './StudentskaSluzba';

export interface Biblioteka {
  id: number;
  vidljiv: boolean;
  studentska_sluzba: StudentskaSluzba;
  bibliotekaKnjiga?: BibliotekaKnjiga[];
}
