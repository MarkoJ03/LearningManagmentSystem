
import { GodinaStudija } from './GodinaStudija';
import { Katedra } from './Katedra';
import { TipPrograma } from './TipPrograma';

export interface StudijskiProgram {
  id: number;
  naziv: string;
  tipPrograma: TipPrograma;
  katedra: Katedra;
  godineStudija?: GodinaStudija[];
  vidljiv: boolean;
}
