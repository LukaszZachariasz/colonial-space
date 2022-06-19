import {PlanetState} from '../../store/territory/planet/planet.state';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../store/territory/territory.state';
import {completeColonization} from '../../store/territory/territory.slice';
import {logic} from '../../../game';
import {selectUnitByTerritoryId} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

export class ColonizationService {
    public colonizedPlanetCompleted$: Subject<string> = new Subject<string>();

    public colonize(territoryState: TerritoryState<PlanetState>): void {
        store.dispatch(completeColonization({
            territoryId: territoryState.id
        }));
        logic().unitService.removeUnit(selectUnitByTerritoryId(territoryState.id).id);
        this.colonizedPlanetCompleted$.next(territoryState.id);
    }
}
