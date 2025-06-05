import { StudentskaSluzba } from "./StudentskaSluzba";

export interface Objava {
  id: number;
  naslov: string;
  sadrzaj: string;
  studentska_sluzba: StudentskaSluzba;
  vidljiv: boolean;
}
