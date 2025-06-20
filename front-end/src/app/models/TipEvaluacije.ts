import { EvaluacijaZnanja } from './EvaluacijaZnanja';

export interface TipEvaluacije {
  id: number;
  naziv: string;
  vidljiv: boolean;
  evaluacijeZnanja?: EvaluacijaZnanja[];
}
