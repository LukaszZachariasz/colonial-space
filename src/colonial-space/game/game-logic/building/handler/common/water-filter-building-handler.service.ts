import {AddTourEffect} from '../../../tour/tour-effect/add-tour-effect';
import {BuildingObjectState} from '../../../store/building/building-scope/building-object/building-object.state';
import {BuildingObjectType} from '../../../store/building/building-scope/building-object/building-object-type';
import {HasTourEffects} from '../../../tour/tour-effect/has-tour-effects';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../tour/tour-effect/tour-effect-priority.enum';
import {
    selectBuildingByBuildingObjectId,
    selectBuildingObjectsByProduction0AndNotBuiltAndType
} from '../../../store/building/building.selector';
import {selectTerritoryByBuildingId} from '../../../store/territory/territory.selectors';
import {setIsBuiltTrue} from '../../../store/building/building.slice';
import {setWaterPercentage} from '../../../store/territory/territory.slice';
import {store} from '../../../store/store';

@HasTourEffects()
@Injectable()
export class WaterFilterBuildingHandlerService {
    @AddTourEffect({
        name: 'after building process',
        priority: TourEffectPriorityEnum.AFTER_BUILDING_PROCESS
    })
    private afterBuildingProcess(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            const buildingObjects: BuildingObjectState[] = selectBuildingObjectsByProduction0AndNotBuiltAndType(BuildingObjectType.WATER_FILTER);
            buildingObjects.forEach((object: BuildingObjectState) => {
                const planet = selectTerritoryByBuildingId(selectBuildingByBuildingObjectId(object.id).id);
                let newWater = planet.data.water + 10;
                if (newWater > 100) {
                    newWater = 100;
                }
                store.dispatch(setWaterPercentage({
                    territoryId: planet.id,
                    value: newWater
                }));

                store.dispatch(setIsBuiltTrue({
                    buildingObjectId: object.id
                }));
            });
            subscriber.next();
            subscriber.complete();
        });
    }
}