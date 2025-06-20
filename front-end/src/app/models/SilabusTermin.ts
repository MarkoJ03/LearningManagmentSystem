import { Nastavnik } from "./Nastavnik";
import { Silabus } from "./Silabus";

export interface SilabusTermin {
  id: number;
  datum: string;
  materijal:string;
  cilj: string;
  opis: string;
  nastavnik?: Nastavnik;
  silabus?: Silabus;
  vidljiv: boolean;
}