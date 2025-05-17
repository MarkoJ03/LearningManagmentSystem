import { StudentskaSluzba } from "./StudentskaSluzba";

export interface Objava {
  id: number;
  vidljiv: boolean;
  studentska_sluzba: StudentskaSluzba;
  naslov: string;
  sadrzaj: string;
}