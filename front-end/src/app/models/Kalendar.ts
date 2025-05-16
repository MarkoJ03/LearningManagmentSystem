import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { GrupaStudenata } from './GrupaStudenata';
import { TerminNastave } from './TerminNastave';

export interface Kalendar {
  id: number;
  vidljiv: boolean;
  studentskaSluzba_id: number;         
  evaluacijaZnanja?: EvaluacijaZnanja[];        
  grupaStudenata?: GrupaStudenata[];           
  terminiNastave?: TerminNastave[];             
}
