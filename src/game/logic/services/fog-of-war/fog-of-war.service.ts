import {SquareState} from '../../store/map/square/square.state';
import {Subject, delay, filter, map, tap} from 'rxjs';
import {TerritoryFactory} from '../../../game-builder/territory-factory/territory-factory';
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
            tap((squareState: SquareState) => TerritoryFactory.create(sceneManager().scene.scene, selectTerritoryById(squareState.territoryId)))
        ).subscribe();
    }
}
