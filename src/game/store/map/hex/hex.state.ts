import {HexTerritoryState} from './hex-territory/hex-territory.state';

export class HexState {
    public x: number;
    public y: number;
    public playerId: string | undefined;
    public territory: HexTerritoryState;
}