
import { GodinaStudija } from './GodinaStudija';

export interface StudijskiProgram {
  id: number;
  naziv: string;
  tipPrograma_id: number;
  katedra_id: number;
  godineStudija?: GodinaStudija[];
  vidljiv: boolean;
}
