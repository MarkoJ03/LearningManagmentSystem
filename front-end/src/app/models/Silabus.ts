import { SilabusTermin } from "./SilabusTermin";

export interface Silabus {
  id: number;
  termini?:SilabusTermin[];
  vidljiv: boolean;
}