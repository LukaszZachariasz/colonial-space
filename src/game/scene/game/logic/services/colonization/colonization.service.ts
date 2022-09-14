import {PlanetState} from '../../store/territory/planet/planet.state';
import {Service} from 'typedi';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../store/territory/territory.state';
import {UnitService} from '../unit/unit.service';
import {completeColonization} from '../../store/territory/territory.slice';
import {selectUnitByTerritoryId} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

@Service()
export class ColonizationService {
    public colonizedPlanetCompleted$: Subject<string> = new Subject<string>();
    
    constructor(private unitService: UnitService) {
    }

    public colonize(territoryState: TerritoryState<PlanetState>): void {
        store.dispatch(completeColonization({
            territoryId: territoryState.id
        }));
        this.unitService.removeUnit(selectUnitByTerritoryId(territoryState.id).id);
        this.colonizedPlanetCompleted$.next(territoryState.id);
    }
}
