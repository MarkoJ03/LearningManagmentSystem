import { DokumentiPredmeta } from './DokumentiPredmeta';
import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { GrupaStudenataPredmet } from './GrupaStudenataPredmet';
import { RealizacijaPredmeta } from './RealizacijaPredmeta';

export interface Predmet {
  id: number;
  naziv: string;
  esbp: number;
  obavezan: boolean;
  brojPredavanja: number;
  brojVezbi: number;
  istrazivackiRad: boolean;
  brojSemestara: number;
  opis: string;
  cilj: string;
  dokumenti: DokumentiPredmeta;
  evaluacijaZnanja?: EvaluacijaZnanja[];
  grupaStudenataPredmet?: GrupaStudenataPredmet[];
  realizacijePredmeta?: RealizacijaPredmeta[];
  vidljiv: boolean;
}
