import { IshodEvaluacije } from "./IshodEvaluacije";
import { Kalendar } from "./Kalendar";
import { Nastavnik } from "./Nastavnik";
import { Predmet } from "./Predmet";
import { TipEvaluacije } from "./TipEvaluacije";

export interface EvaluacijaZnanja {
  id: number;
  vidljiv: boolean;
  kalendar: Kalendar;
  nastavnik: Nastavnik;
  predmet: Predmet;
  tip_evaluacije: TipEvaluacije;
  vreme_pocetka: Date;
  vreme_zavrsetka: Date;
  ishodEvaluacije?: IshodEvaluacije[];
}
