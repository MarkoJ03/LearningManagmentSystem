import { StudentNaGodini } from './StudentNaGodini';
import { GrupaStudenataPredmet } from './GrupaStudenataPredmet';
import { Kalendar } from './Kalendar';

export interface GrupaStudenata {
  id: number;
  vidljiv: boolean;
  kalendar: Kalendar;                          
  studentNaGodini?: StudentNaGodini[];        
  grupaStudenataPredmet?: GrupaStudenataPredmet[];
}
