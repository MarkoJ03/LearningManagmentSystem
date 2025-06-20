import { Adresa } from "./Adresa";
import { Korisnik } from "./Korisnik";
import { StudentskaSluzba } from "./StudentskaSluzba";


export interface Student {
  id: number;
  korisnik: Korisnik;
  ime: string;
  prezime: string;
  jmbg: string;
  adresa: Adresa;
  studentskaSluzba: StudentskaSluzba;
  vidljiv: boolean;
}
