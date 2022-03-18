import {Hex} from '../../game-objects/hex/hex';
import {HexState} from '../../game-state/map/hex/hex.state';
import {MapState} from '../../game-state/map/map.state';
import {PlanetGenerator} from './planet-generator/planet-generator';
import {PlayerState} from '../../game-state/player/player.state';

export class MapGenerator {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 30;

    private planetGenerator: PlanetGenerator = new PlanetGenerator();

    public generate(playerState: PlayerState): MapState {
        const map = new MapState();
        for (let x = 0; x < MapGenerator.MapHeight; x++) {
            const row: HexState[] = [];
            for (let y = 0; y < MapGenerator.MapWidth; y++) {
                const xOffset = y % 2 === 1 ? Hex.HexEdgeWidth + (Hex.HexEdgeWidth / 2) : 0;

                const hex = new HexState();
                hex.x = (x * (Hex.HexWidth + Hex.HexEdgeWidth)) - xOffset;
                hex.y = -y * Hex.HexRadius;

                row.push(hex);
            }
            map.hexes.push(row);
        }

        this.planetGenerator.generate(playerState, map.hexes);

        return map;
    }
}