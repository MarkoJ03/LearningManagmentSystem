import { BibliotekaKnjiga } from './BibliotekaKnjiga';
import { Knjiga } from './Knjiga';
import { StudentskaSluzba } from './StudentskaSluzba';

export interface Biblioteka {
  id: number;
  vidljiv: boolean;
  studentska_sluzba: StudentskaSluzba;
  knjige: BibliotekaKnjiga[];
}
