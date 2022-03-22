import {HexModel} from '../../scene/space/model/hex/hex.model';
import {HexState} from '../../store/map/hex/hex.state';
import {MapState} from '../../store/map/map.state';
import {randomSpaceSkybox} from '../../scene/space/skybox/space/space-skybox.const';

export class MapGenerator {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 20;

    public generate(): MapState {
        const map = new MapState();
        map.skyboxType = randomSpaceSkybox();

        for (let y = 0; y < MapGenerator.MapHeight; y++) {
            const row: HexState[] = [];
            const yColumnOffset = y * HexModel.HexRadius;
            for (let x = 0; x < MapGenerator.MapWidth; x++) {
                const yOffset = x % 2 === 1 ? HexModel.HexRadius : 0;

                const hex = new HexState();
                hex.y = -y * HexModel.HexRadius - yOffset - yColumnOffset;
                hex.x = (x * (HexModel.HexWidth - (HexModel.HexEdgeWidth / 2)));
                row.push(hex);
            }
            map.hexes.push(row);
        }

        return map;
    }
}
