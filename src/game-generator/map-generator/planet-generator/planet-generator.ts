import {HexState} from '../../../game-state/map/hex/hex.state';
import {MapGenerator} from '../map-generator';

export class PlanetGenerator {
    private static readonly Planets = 10;


    public generate(hexes: HexState[][]): void {
        const yRows = Math.floor(MapGenerator.MapHeight / PlanetGenerator.Planets);
        const xRows = Math.floor(PlanetGenerator.Planets / yRows);

        const xSize = MapGenerator.MapWidth / xRows;
        const ySize = MapGenerator.MapHeight / yRows;
        console.log(xSize, ySize);


        for (let x = 0; x < xRows; x++) {
            for (let y = 0; y < yRows; y++) {
                //
            }
        }
    }
}