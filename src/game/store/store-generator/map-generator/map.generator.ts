import {MapState} from '../../map/map.state';
import {SquareModel} from '../../../scene/space/model/square/square.model';
import {SquareState} from '../../map/square/square.state';
import {randomSpaceSkybox} from '../../../scene/space/skybox/space/space-skybox.const';

export class MapGenerator {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 20;

    public generate(): MapState {
        const map = new MapState();
        map.skyboxType = randomSpaceSkybox();

        for (let y = 0; y < MapGenerator.MapHeight; y++) {
            const row: SquareState[] = [];
            for (let x = 0; x < MapGenerator.MapWidth; x++) {

                const square = new SquareState();
                square.y = -y * SquareModel.SquareEdgeWidth;
                square.x = x * SquareModel.SquareEdgeWidth;
                row.push(square);
            }
            map.squares.push(row);
        }

        return map;
    }
}
