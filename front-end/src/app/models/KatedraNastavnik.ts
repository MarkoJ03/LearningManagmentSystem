import { Katedra } from "./Katedra";
import { Nastavnik } from "./Nastavnik";


export interface KatedraNastavnik {
  id?: number;
  vidljiv: boolean;
  katedra: Katedra;      
  nastavnik: Nastavnik;  
}
