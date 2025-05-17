
import { GodinaStudija } from './GodinaStudija';
import { GrupaStudenata } from './GrupaStudenata';
import { IshodEvaluacije } from './IshodEvaluacije';
import { Student } from './Student';
import { SvObrazac } from './SvObrazac';


export interface StudentNaGodini {
  id: number;
  brojIndeksa: string;
  datumUpisa: Date;
  student: Student;
  godinaStudija: GodinaStudija;
  grupaStudenata: GrupaStudenata;
  ishodEvaluacije?: IshodEvaluacije[];
  svObrazac: SvObrazac;
  vidljiv: boolean;
}
