import { Zvanje } from './Zvanje';

export interface NaucnaOblast {
  id: number;
  naziv: string;
  zvanja?: Zvanje[];
  vidljiv: boolean;
}
