
import { Zvanje } from './Zvanje';
import { DepartmanNastavnik } from './DepartmanNastavnik';
import { KatedraNastavnik } from './KatedraNastavnik';
import { RealizacijaPredmeta } from './RealizacijaPredmeta';
import { Obavestenje } from './Obavestenje';
import { EvaluacijaZnanja } from './EvaluacijaZnanja';

export interface Nastavnik {
  id: number;
  korisnik_id: number;                    
  ime: string;
  prezime: string;
  jmbg: string;
  studentskaSluzba_id: number;    
  vidljiv: boolean;
  zvanja?: Zvanje[];                      
  departmani?: DepartmanNastavnik[];     
  katedre?: KatedraNastavnik[];          
  realizacijePredmeta?: RealizacijaPredmeta[];
  obavestenja?: Obavestenje[];            
  evaluacijaZnanja?: EvaluacijaZnanja[];  
}
