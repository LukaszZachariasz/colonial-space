import {Injectable} from '@colonial-space/core/injector/injectable';
import {MapState} from '../../game-logic/store/map/map.state';
import {SquareModel} from '../../space-scene/model/map/square/square.model';
import {SquareState} from '../../game-logic/store/map/square/square.state';
import {randomSpaceSkybox} from '../../../shared/skybox/space-skybox.const';
import {v4 as uuid} from 'uuid';

@Injectable()
export class MapGeneratorService {
    public static readonly MapHeight = 15;
    public static readonly MapWidth = 20;

    public generate(): MapState {
        const map: MapState = {
            skyboxType: randomSpaceSkybox(),
            squares: []
        };

        for (let y = 0; y < MapGeneratorService.MapHeight; y++) {
            const row: SquareState[] = [];
            for (let x = 0; x < MapGeneratorService.MapWidth; x++) {
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
