import {HexModel} from '../../scene/space/model/hex/hex.model';
import {HexState} from '../../store/map/hex/hex.state';
import {MapState} from '../../store/map/map.state';
import {PlanetGenerator} from './planet-generator/planet.generator';
import {PlayerState} from '../../store/player/player.state';
import {randomSpaceSkybox} from '../../scene/space/skybox/space/space-skybox.const';

export class MapGenerator {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 30;

    private planetGenerator: PlanetGenerator = new PlanetGenerator();

    public generate(playerState: PlayerState): MapState {
        const map = new MapState();
        map.skyboxType = randomSpaceSkybox();

        for (let x = 0; x < MapGenerator.MapHeight; x++) {
            const row: HexState[] = [];
            for (let y = 0; y < MapGenerator.MapWidth; y++) {
                const xOffset = y % 2 === 1 ? HexModel.HexEdgeWidth + (HexModel.HexEdgeWidth / 2) : 0;

                const hex = new HexState();
                hex.x = (x * (HexModel.HexWidth + HexModel.HexEdgeWidth)) - xOffset;
                hex.y = -y * HexModel.HexRadius;

                row.push(hex);
            }
            map.hexes.push(row);
        }

        this.planetGenerator.generate(playerState, map.hexes);

        return map;
    }
}
