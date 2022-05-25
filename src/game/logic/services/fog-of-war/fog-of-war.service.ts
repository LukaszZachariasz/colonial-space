import {PlanetModel} from '../../../scene/space/model/territory/planet/planet.model';
import {SquareState} from '../../store/map/square/square.state';
import {Subject, delay, filter, map, tap} from 'rxjs';
import {sceneManager} from 'engine';
import {selectSquareById} from '../../store/map/square/square.selectors';
import {selectTerritoryById} from '../../store/territory/territory.selectors';

export class FogOfWarService {
    public removeFogOfWar$ = new Subject<string>();

    constructor() {
        this.removeFogOfWar$.pipe(
            delay(10),
            map((squareId: string) => selectSquareById(squareId)),
            filter((square: SquareState) => !!square.territoryId),
            tap((squareState: SquareState) => new PlanetModel(
                sceneManager().scene.scene,
                selectTerritoryById(squareState.territoryId))
            )
        ).subscribe();
    }
}
