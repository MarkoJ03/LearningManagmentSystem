import { Nastavnik } from "./Nastavnik";
import { NaucnaOblast } from "./NaucnaOblast";
import { TipZvanja } from "./TipZvanja";


export interface Zvanje {
  id: number;
  datumIzbora: Date;
  datumPrestanka: Date;
  tipZvanja: TipZvanja;
  naucnaOblast: NaucnaOblast;
  nastavnik: Nastavnik;
  vidljiv: boolean;
}
