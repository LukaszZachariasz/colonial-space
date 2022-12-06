import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Observable, Subject, Subscriber} from 'rxjs';
import {PlanetProductionService} from '../territory/planet/planet-production.service';
import {TerritoryState} from '../store/territory/territory.state';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {build, selectBuilding} from '../store/building/building.slice';
import {isPlanet} from '../store/territory/planet/is-planet';
import {selectBuildingByBuildingObjectId} from '../store/building/building.selector';
import {selectTerritories} from '../store/territory/territory.selectors';
import {store} from '../store/store';

@Injectable()
@HasTourEffects()
export class BuildingService {
    @Inject(PlanetProductionService) private planetProductionService: PlanetProductionService;
    
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
    private startBuildingProcesses(): Observable<any>{
        return new Observable((subscriber: Subscriber<any>) => {
            selectTerritories().forEach((el: TerritoryState) => {
                if (isPlanet(el)) {
                    store.dispatch(build({
                        buildingId: el.data.buildingId,
                        production: this.planetProductionService.getTotalProduction(el.data)
                    }));
                }
            });
            subscriber.next();
            subscriber.complete();
        });
    }
}
