import {HexState} from './hex/hex.state';
import {HexTerritoryState} from './hex/hex-territory/hex-territory.state';
import {HexTerritoryTypeEnum} from '../../game-objects/hex/hex-territory/hex-territory-type.enum';
import {PlanetData} from './hex/hex-territory/planet/planet-data';

export class MapState {
    public hexes: HexState[][] = [];

    public getPlanets(): HexTerritoryState<PlanetData>[] {
        return this.hexes.flat().filter((hex: HexState) => hex.territory?.type === HexTerritoryTypeEnum.PLANET).map((hex: HexState) => hex.territory);
    }

    public getPlayerPlanets(playerId: string): HexTerritoryState<PlanetData>[] {
        return this.getPlanets().filter((el: HexTerritoryState<PlanetData>) => el.data.playerId === playerId);
    }
}