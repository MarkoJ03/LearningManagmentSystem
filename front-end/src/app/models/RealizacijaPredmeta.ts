
import { Nastavnik } from './Nastavnik';
import { Predmet } from './Predmet';
import { PredmetRealizacijePredmeta } from './PredmetRealizacijePredmeta';
import { TerminNastave } from './TerminNastave';
import { TipNastave } from './TipNastave';

export interface RealizacijaPredmeta {
  id: number;
  nastavnik: Nastavnik;
  tipNastave: TipNastave;
  predmeti: PredmetRealizacijePredmeta[];
  terminiNastave?: TerminNastave[];
  vidljiv: boolean;
}
