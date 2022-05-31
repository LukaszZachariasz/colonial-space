import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Observable, Subject, Subscriber} from 'rxjs';
import {TerritoryState} from '../../store/territory/territory.state';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {build, selectBuilding} from '../../store/building/building.slice';
import {isTerritoryPlanet} from '../../store/territory/planet/is-territory-planet';
import {logic} from '../../../game';
import {selectBuildingByBuildingObjectId} from '../../store/building/building.selector';
import {selectTerritories} from '../../store/territory/territory.selectors';
import {store} from '../../store/store';

@HasTourEffects()
export class BuildingService {
    public startBuildingObject$: Subject<string> = new Subject<string>();
    
    public startBuilding(buildingObjectId: string): void {
        store.dispatch(selectBuilding({
            buildingId: selectBuildingByBuildingObjectId(buildingObjectId).id,
            objectId: buildingObjectId
        }));
        
        this.startBuildingObject$.next(buildingObjectId);
    }

    public stopBuilding(buildingObjectId: string): void {
        store.dispatch(selectBuilding({
            buildingId: selectBuildingByBuildingObjectId(buildingObjectId).id,
            objectId: null
        }));

        this.startBuildingObject$.next(null);
    }

    @AddTourEffect({
        name: 'start building processes',
        priority: TourEffectPriorityEnum.START_BUILDING_PROCESS
    })
    private startBuildingProcesses(): any {
        return new Observable((subscriber: Subscriber<any>) => {
            selectTerritories().forEach((el: TerritoryState) => {
                if (isTerritoryPlanet(el)) {
                    store.dispatch(build({
                        buildingId: el.data.buildingId,
                        production: logic().planetProductionService.getTotalProduction(el.data)
                    }));
                }
            });
            subscriber.next();
            subscriber.complete();
        });
    }
}