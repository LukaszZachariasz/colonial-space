import {MapState} from '../../store/map/map.state';
import {SquareModel} from '../../../scene/space/model/map/square/square.model';
import {SquareState} from '../../store/map/square/square.state';
import {randomSpaceSkybox} from '../../../scene/space/model/skybox/space/space-skybox.const';
import {v4 as uuid} from 'uuid';

export class MapGenerator {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 20;

    public generate(): MapState {
        const map: MapState = {
            skyboxType: randomSpaceSkybox(),
            squares: []
        };

        for (let y = 0; y < MapGenerator.MapHeight; y++) {
            const row: SquareState[] = [];
            for (let x = 0; x < MapGenerator.MapWidth; x++) {
                const square: SquareState = {
                    id: uuid(),
                    x: x * SquareModel.SquareEdgeSize,
                    y: -y * SquareModel.SquareEdgeSize,
                    playerId: undefined,
                    territoryId: undefined,
                    unitId: undefined,
                    fogOfWar: true
                };
                row.push(square);
            }
            map.squares.push(row);
        }

        return map;
    }
}
