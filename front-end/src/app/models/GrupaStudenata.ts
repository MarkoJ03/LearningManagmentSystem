import { StudentNaGodini } from './StudentNaGodini';
import { GrupaStudenataPredmet } from './GrupaStudenataPredmet';

export interface GrupaStudenata {
  id: number;
  vidljiv: boolean;
  kalendar_id: number;                          
  studentNaGodini?: StudentNaGodini[];        
  grupaStudenataPredmet?: GrupaStudenataPredmet[];
}
