import { RealizacijaPredmeta } from './RealizacijaPredmeta';
import { IshodEvaluacije } from './IshodEvaluacije';

export interface IshodPredmeta {
  id: number;
  ocena: number;
  realizacijePredmeta?: RealizacijaPredmeta[];  
  ishodiEvaluacije?: IshodEvaluacije[];  
  vidljiv: boolean;
}
