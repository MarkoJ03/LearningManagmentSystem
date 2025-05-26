import { StudentskaSluzba } from "./StudentskaSluzba";

export interface Osoblje {
  id: number;
  vidljiv: boolean;
  studentska_sluzba: StudentskaSluzba;
  ime: string;
  jmbg: string;
  prezime: string;
}
