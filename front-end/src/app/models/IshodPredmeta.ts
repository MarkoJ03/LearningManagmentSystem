import { RealizacijaPredmeta } from './RealizacijaPredmeta';
import { IshodEvaluacije } from './IshodEvaluacije';

export interface IshodPredmeta {
  id: number;
  vidljiv: boolean;
  ocena: number;
  realizacijePredmeta?: RealizacijaPredmeta[];  
  ishodiEvaluacije?: IshodEvaluacije[];  
}
