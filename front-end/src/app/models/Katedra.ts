
import { KatedraNastavnik } from './KatedraNastavnik';

export interface Katedra {
  id: number;
  naziv: string;
  vidljiv: boolean;
  departman_id: number;              
  sekretarKatedre_id: number;        
  sefKatedre_id: number;             
  nastavnici?: KatedraNastavnik[];  
}
