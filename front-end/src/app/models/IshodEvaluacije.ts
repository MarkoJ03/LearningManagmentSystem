import { EvaluacijaZnanja } from "./EvaluacijaZnanja";
import { IshodPredmeta } from "./IshodPredmeta";
import { StudentNaGodini } from "./StudentNaGodini";


export interface IshodEvaluacije {
  id: number;
  bodovi: number;
  napomena: string;
  studentNaGodini: StudentNaGodini;      
  evaluacijaZnanja: EvaluacijaZnanja;    
  ishodPredmeta: IshodPredmeta;          
  vidljiv: boolean;
}
