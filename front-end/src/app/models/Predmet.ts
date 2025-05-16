import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { GrupaStudenataPredmet } from './GrupaStudenataPredmet';
import { RealizacijaPredmeta } from './RealizacijaPredmeta';

export interface Predmet {
  id: number;
  esbp: number;
  obavezan: boolean;
  brojPredavanja: number;
  brojVezbi: number;
  istrazivackiRad: boolean;
  brojSemestara: number;
  opis: string;
  cilj: string;
  dokumenti_id: number;
  evaluacijaZnanja?: EvaluacijaZnanja[];
  grupaStudenataPredmet?: GrupaStudenataPredmet[];
  realizacijePredmeta?: RealizacijaPredmeta[];
  vidljiv: boolean;
}
