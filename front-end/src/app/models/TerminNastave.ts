import { Kalendar } from "./Kalendar";
import { RealizacijaPredmeta } from "./RealizacijaPredmeta";


export interface TerminNastave {
  id: number;
  vremePocetka: Date;
  vremeKraja: Date;
  brojCasova: number;
  realizacijaPredmeta: RealizacijaPredmeta;
  kalendar: Kalendar;
  vidljiv: boolean;
}
