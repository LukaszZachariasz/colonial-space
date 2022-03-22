import {v4 as uuid} from 'uuid';

export class HexState {
    public id: string = uuid();
    public x: number;
    public y: number;
    public playerId: string | undefined;
    public territoryId: string | undefined;
    public unitId: string | undefined;
}
