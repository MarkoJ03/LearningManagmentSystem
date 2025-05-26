import { StudentNaGodini } from "./StudentNaGodini";
import { StudentskaSluzba } from "./StudentskaSluzba";


export interface SvObrazac {
  id: number;
  maternjiJezik: string;
  vrstaZavreseneSrednje: string;
  datumZavrsetkaSrednje: string;
  bracniStatus: boolean;
  kontakt: string;
  zaposlen: boolean;
  nacinFinansiranja: boolean;
  studentNaGodini: StudentNaGodini;
  studentska_sluzba: StudentskaSluzba;
  vidljiv: boolean;
}
