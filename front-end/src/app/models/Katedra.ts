
import { Departman } from './Departaman';
import { KatedraNastavnik } from './KatedraNastavnik';
import { Nastavnik } from './Nastavnik';
import { StudijskiProgram } from './StudijskiProgram';

export interface Katedra {
  id: number;
  naziv: string;
  vidljiv: boolean;
  departman: Departman;              
  sekretarKatedre: Nastavnik;        
  sefKatedre: Nastavnik;             
  studijskiProgrami?: StudijskiProgram[];
  nastavnici?: KatedraNastavnik[];  
}
