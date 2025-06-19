import { DokumentiPredmeta } from './DokumentiPredmeta';
import { EvaluacijaZnanja } from './EvaluacijaZnanja';
import { GrupaStudenataPredmet } from './GrupaStudenataPredmet';
import { Obavestenje } from './Obavestenje';
import { PredmetRealizacijePredmeta } from './PredmetRealizacijePredmeta';

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
  dokumentiPredmeta?: DokumentiPredmeta;
  evaluacijeZnanja?: EvaluacijaZnanja[];
  grupeStudenata?: GrupaStudenataPredmet[];
  realizacijePredmeta?: PredmetRealizacijePredmeta[];
  obavestenja?: Obavestenje[];
  vidljiv: boolean;
}
