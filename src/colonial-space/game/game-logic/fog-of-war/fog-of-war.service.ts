import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SquareState} from '../store/map/square/square.state';
import {Subject, delay, filter, map, tap} from 'rxjs';
import {TerritoryFactoryService} from '../../game-builder/territory-factory/territory-factory.service';
import {selectSquareById} from '../store/map/square/square.selectors';
import {selectTerritoryById} from '../store/territory/territory.selectors';

@Injectable()
export class FogOfWarService {
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    @Inject(TerritoryFactoryService) private territoryFactoryService: TerritoryFactoryService;
    
    public removeFogOfWar$ = new Subject<string>();

    constructor() {
        this.removeFogOfWar$.pipe(
            delay(10),
            map((squareId: string) => selectSquareById(squareId)),
            filter((square: SquareState) => !!square.territoryId),
            tap((squareState: SquareState) => this.territoryFactoryService.create(this.scene, selectTerritoryById(squareState.territoryId)))
        ).subscribe();
    }
}
