import { Departman } from "./Departaman";
import { Nastavnik } from "./Nastavnik";

export interface DepartmanNastavnik {
  id: number;
  vidljiv: boolean;
  departman: Departman;
  nastavnik: Nastavnik;
  
}
