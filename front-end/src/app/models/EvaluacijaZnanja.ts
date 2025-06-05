import { IshodEvaluacije } from "./IshodEvaluacije";
import { Kalendar } from "./Kalendar";
import { Nastavnik } from "./Nastavnik";
import { Predmet } from "./Predmet";
import { TipEvaluacije } from "./TipEvaluacije";

export interface EvaluacijaZnanja {
  id: number;
  kalendar: Kalendar;
  nastavnik: Nastavnik;
  predmet: Predmet;
<<<<<<< Updated upstream
  tip_evaluacije: TipEvaluacije;
  vreme_pocetka: Date;
  vreme_zavrsetka: Date;
  ishodiEvaluacije?: IshodEvaluacije[];
  vidljiv: boolean;
=======
  tipEvaluacije: TipEvaluacije;
  vremePocetka: Date;
  vremeZavrsetka: Date;
  ishodEvaluacije?: IshodEvaluacije[];
>>>>>>> Stashed changes
}
