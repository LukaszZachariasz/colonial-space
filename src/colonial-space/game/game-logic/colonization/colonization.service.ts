import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetState} from '../store/territory/planet/planet.state';
import {Subject} from 'rxjs';
import {TerritoryState} from '../store/territory/territory.state';
import {UnitService} from '../unit/unit.service';
import {completeColonization} from '../store/territory/territory.slice';
import {selectUnitByTerritoryId} from '../store/unit/unit.selectors';
import {store} from '../store/store';

@Injectable()
export class ColonizationService {
    @Inject(UnitService) private unitService: UnitService;

    public colonizedPlanetCompleted$: Subject<string> = new Subject<string>();
    
    public colonize(territoryState: TerritoryState<PlanetState>): void {
        store.dispatch(completeColonization({
            territoryId: territoryState.id
        }));
        this.unitService.removeUnit(selectUnitByTerritoryId(territoryState.id).id);
        this.colonizedPlanetCompleted$.next(territoryState.id);
    }
}
