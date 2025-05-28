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
  tipEvaluacije: TipEvaluacije;
  vremePocetka: Date;
  vremeZavrsetka: Date;
  ishodEvaluacije?: IshodEvaluacije[];
}
