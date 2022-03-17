import {Hex} from '../../game-objects/hex/hex';
import {HexState} from '../../game-state/map/hex/hex.state';
import {MapState} from '../../game-state/map/map.state';
import {PlanetGenerator} from './planet-generator/planet-generator';

export class MapGenerator {
    public static readonly MapWidth = 15;
    public static readonly MapHeight = 30;

    private planetGenerator: PlanetGenerator = new PlanetGenerator();

    public generate(): MapState {
        const map = new MapState();
        for (let x = 0; x < MapGenerator.MapWidth; x++) {
            const row: HexState[] = [];
            for (let y = 0; y < MapGenerator.MapHeight; y++) {
                const xOffset = y % 2 === 1 ? Hex.HexEdgeWidth + (Hex.HexEdgeWidth / 2) : 0;

                const hex = new HexState();
                hex.x = (x * (Hex.HexWidth + Hex.HexEdgeWidth)) - xOffset;
                hex.y = -y * Hex.HexRadius;

                if (Math.random() < 0.1) {
                    hex.object = true;
                }

                row.push(hex);
            }
            map.hexes.push(row);
        }

        this.planetGenerator.generate(map.hexes);

        return map;
    }
}