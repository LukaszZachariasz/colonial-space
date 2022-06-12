import {AddTourEffect} from '../../../../tour/tour-effect/add-tour-effect';
import {BuildingObjectState} from '../../../../../store/building/building-scope/building-object/building-object.state';
import {BuildingObjectType} from '../../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {
    ScoutShipGenerator
} from '../../../../../store-generator/unit-generator/scout-ship-generator/scout-ship.generator';
import {ScoutShipModel} from '../../../../../../scene/space/model/unit/scout-ship/scout-ship.model';
import {TourEffectPriorityEnum} from '../../../../tour/tour-effect/tour-effect-priority.enum';
import {addUnit} from '../../../../../store/unit/unit.slice';
import {modelManager, sceneManager} from 'engine';
import {
    selectBuildingByBuildingObjectId,
    selectBuildingObjectsByProduction0AndNotBuiltAndType
} from '../../../../../store/building/building.selector';
import {selectPlayerId} from '../../../../../store/player/player.selectors';
import {selectSquareByTerritoryId} from '../../../../../store/map/square/square.selectors';
import {selectTerritoryByBuildingId} from '../../../../../store/territory/territory.selectors';
import {selectUnitById} from '../../../../../store/unit/unit.selectors';
import {setProductionToBeginning} from '../../../../../store/building/building.slice';
import {setSquareUnitId} from '../../../../../store/map/map.slice';
import {store} from '../../../../../store/store';

@HasTourEffects()
export class ScoutShipBuildingHandlerService {
    @AddTourEffect({
        name: 'after building process',
        priority: TourEffectPriorityEnum.AFTER_BUILDING_PROCESS
    })
    private afterBuildingProcess(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            const buildingObjects: BuildingObjectState[] = selectBuildingObjectsByProduction0AndNotBuiltAndType(BuildingObjectType.SCOUT_SHIP);
            buildingObjects.forEach((object: BuildingObjectState) => {
                const planet = selectTerritoryByBuildingId(selectBuildingByBuildingObjectId(object.id).id);

                const unit = ScoutShipGenerator.generate(selectPlayerId());

                store.dispatch(addUnit(unit));
                store.dispatch(setSquareUnitId({
                    unitId: unit.id,
                    squareId: selectSquareByTerritoryId(planet.id).id
                }));
                modelManager().addModel(new ScoutShipModel(sceneManager().currentBabylonScene, selectUnitById(unit.id)));

                store.dispatch(setProductionToBeginning({
                    buildingObjectId: object.id
                }));
            });
            subscriber.next();
            subscriber.complete();
        });
    }
}