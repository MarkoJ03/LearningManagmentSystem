
import { IshodEvaluacije } from './IshodEvaluacije';


export interface StudentNaGodini {
  id: number;
  brojIndeksa: string;
  datumUpisa: Date;
  student_id: number;
  godinaStudija_id: number;
  grupaStudenata_id: number;
  ishodEvaluacije?: IshodEvaluacije[];
  svObrazac_id: number;
  vidljiv: boolean;
}
