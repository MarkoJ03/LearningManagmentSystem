import { StudijskiProgram } from './StudijskiProgram';

export interface TipPrograma {
  id: number;
  naziv: string;
  vidljiv: boolean;
  programi?: StudijskiProgram[];
}
