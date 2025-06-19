import { GrupaStudenata } from "./GrupaStudenata";
import { Predmet } from "./Predmet";


export interface GrupaStudenataPredmet {
  id?: number;
  grupaStudenata: GrupaStudenata;  
  predmet: Predmet;                 
  vidljiv: boolean;
}
