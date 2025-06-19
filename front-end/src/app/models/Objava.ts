import { StudentskaSluzba } from "./StudentskaSluzba";

export interface Objava {
  id: number;
  naslov: string;
  sadrzaj: string;
  studentskaSluzba: StudentskaSluzba;
  vidljiv: boolean;
}
