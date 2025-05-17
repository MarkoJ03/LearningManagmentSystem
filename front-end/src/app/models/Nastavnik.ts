
import { Zvanje } from './Zvanje';
import { DepartmanNastavnik } from './DepartmanNastavnik';
import { KatedraNastavnik } from './KatedraNastavnik';
import { RealizacijaPredmeta } from './RealizacijaPredmeta';
import { Obavestenje } from './Obavestenje';
import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { StudentskaSluzba } from './StudentskaSluzba';
import { Korisnik } from './Korisnik';

export interface Nastavnik {
  id: number;
  korisnik: Korisnik;                    
  ime: string;
  prezime: string;
  jmbg: string;
  studentskaSluzba: StudentskaSluzba;    
  vidljiv: boolean;
  zvanja?: Zvanje[];                      
  departmani?: DepartmanNastavnik[];     
  katedre?: KatedraNastavnik[];          
  realizacijePredmeta?: RealizacijaPredmeta[];
  obavestenja?: Obavestenje[];            
  evaluacijaZnanja?: EvaluacijaZnanja[];  
}
