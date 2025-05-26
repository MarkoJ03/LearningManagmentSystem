import { Zvanje } from './Zvanje';

export interface NaucnaOblast {
  id: number;
  naziv: string;
  vidljiv: boolean;
  zvanja?: Zvanje[];
}
