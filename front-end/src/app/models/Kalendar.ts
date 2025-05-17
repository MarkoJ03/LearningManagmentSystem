import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { GrupaStudenata } from './GrupaStudenata';
import { StudentskaSluzba } from './StudentskaSluzba';
import { TerminNastave } from './TerminNastave';

export interface Kalendar {
  id: number;
  vidljiv: boolean;
  studentskaSluzba: StudentskaSluzba;         
  evaluacijaZnanja?: EvaluacijaZnanja[];        
  grupaStudenata?: GrupaStudenata[];           
  terminiNastave?: TerminNastave[];             
}
