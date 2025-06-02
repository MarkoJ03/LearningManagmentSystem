
import { IshodPredmeta } from './IshodPredmeta';
import { Nastavnik } from './Nastavnik';
import { Predmet } from './Predmet';
import { TerminNastave } from './TerminNastave';
import { TipNastave } from './TipNastave';

export interface RealizacijaPredmeta {
  id: number;
  nastavnik: Nastavnik;
  tipNastave: TipNastave;
  predmet: Predmet;
  terminiNastave?: TerminNastave[];
  vidljiv: boolean;
}
