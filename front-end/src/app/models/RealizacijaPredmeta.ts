
import { TerminNastave } from './TerminNastave';

export interface RealizacijaPredmeta {
  id: number;
  nastavnik_id: number;
  tipNastave_id: number;
  predmet_id: number;
  ishodPredmeta_id: number;
  terminiNastave?: TerminNastave[];
  vidljiv: boolean;
}
