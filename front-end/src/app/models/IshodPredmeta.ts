import { RealizacijaPredmeta } from './RealizacijaPredmeta';
import { IshodEvaluacije } from './IshodEvaluacije';

export interface IshodPredmeta {
  id: number;
  ocena: number;
<<<<<<< Updated upstream
  realizacijePredmeta?: RealizacijaPredmeta[];  
  ishodiEvaluacije?: IshodEvaluacije[];  
=======
  realizacijePredmeta?: RealizacijaPredmeta[];
  ishodiEvaluacije?: IshodEvaluacije[];
>>>>>>> Stashed changes
  vidljiv: boolean;
}
