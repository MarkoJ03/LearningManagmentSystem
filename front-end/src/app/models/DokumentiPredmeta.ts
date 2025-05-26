import { Predmet } from "./Predmet";

export interface DokumentiPredmeta {
  id: number;
  vidljiv: boolean;
  akreditacija: string;
  silabus: string;
  predmet: Predmet;
}
