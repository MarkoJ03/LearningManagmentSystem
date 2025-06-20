import { RealizacijaPredmeta } from './RealizacijaPredmeta';

export interface TipNastave {
  id: number;
  naziv: string;
  vidljiv: boolean;
  realizacijePredmeta?: RealizacijaPredmeta[];
}
