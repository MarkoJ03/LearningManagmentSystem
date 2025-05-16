import { IshodEvaluacije } from "./IshodEvaluacije";

export interface EvaluacijaZnanja {
  id: number;
  vidljiv: boolean;
  kalendar_id: number;
  nastavnik_id: number;
  predmet_id: number;
  tip_evaluacije_id: number;
  vreme_pocetka: Date;
  vreme_zavrsetka: Date;
  ishodEvaluacije?: IshodEvaluacije[];
}
