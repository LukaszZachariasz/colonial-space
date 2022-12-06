import {FogOfWarService} from '../../../game-logic/fog-of-war/fog-of-war.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SquareState} from '../../../game-logic/store/map/square/square.state';
import {Subscription, delay, filter, map, tap} from 'rxjs';
import {TerritoryFactoryService} from '../space-scene-builder/territory/territory-factory.service';
import {selectSquareById} from '../../../game-logic/store/map/square/square.selectors';
import {selectTerritoryById} from '../../../game-logic/store/territory/territory.selectors';

@Injectable()
export class RemoveFogOfWarHandlerService implements OnLoad, OnUnload {
    @Inject(TerritoryFactoryService) private territoryFactoryService: TerritoryFactoryService;
    @Inject(FogOfWarService) private fogOfWarService: FogOfWarService;
    
    private showTerritoryUnderFogSubscription: Subscription;
    
    public gameOnLoad(): void {
        this.showTerritoryUnderFogSubscription = this.fogOfWarService.removeFogOfWar$.pipe(
            delay(10),
            map((squareId: string) => selectSquareById(squareId)),
            filter((square: SquareState) => !!square.territoryId),
            tap((squareState: SquareState) => this.territoryFactoryService.create(selectTerritoryById(squareState.territoryId)))
        ).subscribe();
    }
    
    public gameOnUnload(): void {
        this.showTerritoryUnderFogSubscription?.unsubscribe();
    }
}
