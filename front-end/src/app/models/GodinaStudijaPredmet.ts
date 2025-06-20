import { GodinaStudija } from "./GodinaStudija";
import { Predmet } from "./Predmet";

export interface GodinaStudijaPredmet {
  id: number;
  vidljiv: boolean;
  godinaStudija: GodinaStudija;
  predmet: Predmet;       
}
