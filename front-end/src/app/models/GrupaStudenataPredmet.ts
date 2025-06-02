import { GrupaStudenata } from "./GrupaStudenata";
import { Predmet } from "./Predmet";


export interface GrupaStudenataPredmet {
  id?: number;
  vidljiv: boolean;
  grupaStudenata: GrupaStudenata;  
  predmet: Predmet;                 
}
