import { StudentNaGodini } from './StudentNaGodini';
import { StudijskiProgram } from './StudijskiProgram';

export interface GodinaStudija {
  id: number;
  godina: string;
  vidljiv: boolean;
  studijskiProgram: StudijskiProgram;
  studentiNaGodini?: StudentNaGodini[]; 
}
