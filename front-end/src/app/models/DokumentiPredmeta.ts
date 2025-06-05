import { Predmet } from "./Predmet";
import { Silabus } from "./Silabus";

export interface DokumentiPredmeta {
  id: number;
  vidljiv: boolean;
  akreditacija: string;
  silabus: Silabus;
  predmet: Predmet;
}
