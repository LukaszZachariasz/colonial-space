import {SceneManagerService} from '../../../../core/scene-manager/scene-manager.service';
import {Service} from 'typedi';
import {SquareState} from '../../store/map/square/square.state';
import {Subject, delay, filter, map, tap} from 'rxjs';
import {TerritoryFactoryService} from '../../../game-builder/territory-factory/territory-factory.service';
import {selectSquareById} from '../../store/map/square/square.selectors';
import {selectTerritoryById} from '../../store/territory/territory.selectors';

@Service()
export class FogOfWarService {
    public removeFogOfWar$ = new Subject<string>();

    constructor(private sceneManagerService: SceneManagerService,
                private territoryFactoryService: TerritoryFactoryService) {
        this.removeFogOfWar$.pipe(
            delay(10),
            map((squareId: string) => selectSquareById(squareId)),
            filter((square: SquareState) => !!square.territoryId),
            tap((squareState: SquareState) => this.territoryFactoryService.create(this.sceneManagerService.scene.scene, selectTerritoryById(squareState.territoryId)))
        ).subscribe();
    }
}
