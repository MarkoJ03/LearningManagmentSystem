
import { Departman } from './Departaman';
import { KatedraNastavnik } from './KatedraNastavnik';
import { Nastavnik } from './Nastavnik';

export interface Katedra {
  id: number;
  naziv: string;
  vidljiv: boolean;
  departman: Departman;              
  sekretarKatedre: Nastavnik;        
  sefKatedre: Nastavnik;             
  nastavnici?: KatedraNastavnik[];  
}
