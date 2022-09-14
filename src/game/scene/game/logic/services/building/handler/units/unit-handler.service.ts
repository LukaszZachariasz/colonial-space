import * as BABYLON from 'babylonjs';
import {AddTourBlocker} from '../../../tour/tour-blocker/add-tour-blocker';
import {AddTourEffect} from '../../../tour/tour-effect/add-tour-effect';
import {BuildingObjectState} from '../../../../store/building/building-scope/building-object/building-object.state';
import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {Container} from 'typedi';
import {DialogService} from '../../../dialog/dialog.service';
import {FromAboveCamera} from '../../../../../scene/space/camera/from-above-camera';
import {ModelManagerService} from '../../../../../../../core/model-manager/model-manager.service';
import {Observable, Subscriber} from 'rxjs';
import {PlanetProductionService} from '../../../territory/planet/planet-production.service';
import {PlanetState} from '../../../../store/territory/planet/planet.state';
import {SceneManagerService} from '../../../../../../../core/scene-manager/scene-manager.service';
import {SelectedTerritoryService} from '../../../territory/selected-territory.service';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TourBlockerState} from '../../../tour/tour-blocker/tour-blocker';
import {TourEffectPriorityEnum} from '../../../tour/tour-effect/tour-effect-priority.enum';
import {UnitModel} from '../../../../../scene/space/model/unit/unit.model';
import {
    UnitOnSquareWarningGuiElement
} from '../../../../../scene/space/gui/dialogs/complete-building/unit-on-square-warning.gui-element';
import {UnitService} from '../../../unit/unit.service';
import {UnitState} from '../../../../store/unit/unit.state';
import {addUnit} from '../../../../store/unit/unit.slice';
import {
    selectBuildingByBuildingObjectId,
    selectBuildingObjectsByProduction0AndNotBuiltAndType, selectBuildingObjectsByType
} from '../../../../store/building/building.selector';
import {selectSquareByTerritoryId, selectSquareByUnitId} from '../../../../store/map/square/square.selectors';
import {selectTerritoryByBuildingId} from '../../../../store/territory/territory.selectors';
import {selectUnitByTerritoryId} from '../../../../store/unit/unit.selectors';
import {setProductionToBeginning} from '../../../../store/building/building.slice';
import {setSquareUnitId} from '../../../../store/map/map.slice';
import {store} from '../../../../store/store';

export abstract class UnitHandlerService {
    public abstract createUnitState(): UnitState;
    public abstract createModel(id: string): UnitModel;

    protected constructor(private type: BuildingObjectType) {
    }

    @AddTourEffect({
        name: 'after building process',
        priority: TourEffectPriorityEnum.AFTER_BUILDING_PROCESS
    })
    public afterBuildingProcess(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            const buildingObjects: BuildingObjectState[] = selectBuildingObjectsByProduction0AndNotBuiltAndType(this.type);
            buildingObjects.forEach((object: BuildingObjectState) => {
                const planet = selectTerritoryByBuildingId(selectBuildingByBuildingObjectId(object.id).id);

                const unit = this.createUnitState();

                store.dispatch(addUnit(unit));
                store.dispatch(setSquareUnitId({
                    unitId: unit.id,
                    squareId: selectSquareByTerritoryId(planet.id).id
                }));
                Container.get(ModelManagerService).addImportModel(this.createModel(unit.id));
                Container.get(UnitService).addUnit$.next(unit.id);

                store.dispatch(setProductionToBeginning({
                    buildingObjectId: object.id
                }));
            });
            subscriber.next();
            subscriber.complete();
        });
    }

    @AddTourBlocker('cannot built when unit is on square')
    public cannotBuiltWhenUnitIsOnSquare(): Observable<TourBlockerState> {
        return new Observable<TourBlockerState>((subscriber: Subscriber<TourBlockerState>) => {
            const buildingObjects: BuildingObjectState[] = selectBuildingObjectsByType(this.type);
            let errorPosition: BABYLON.Vector3 | null = null;
            let errorPlanet: TerritoryState<PlanetState> | null = null;
            buildingObjects.forEach((object: BuildingObjectState) => {
                const planet = selectTerritoryByBuildingId(selectBuildingByBuildingObjectId(object.id).id);
                const planetProduction = Container.get(PlanetProductionService).getTotalProduction(planet.data);

                if (planetProduction >= object.productionLeft) {
                    const unit = selectUnitByTerritoryId(planet.id);
                    if (unit) {
                        const square = selectSquareByUnitId(unit.id);
                        errorPosition = new BABYLON.Vector3(square.x, 0, square.y);
                        errorPlanet = planet;
                    }
                }
            });

            if (errorPosition) {
                subscriber.next({
                    blocking: true,
                    callback: () => this.showUnitOnSquareWarning(errorPosition, errorPlanet)
                });
            } else {
                subscriber.next({
                    blocking: false
                });
            }
            subscriber.complete();
        });
    }

    private showUnitOnSquareWarning(position: BABYLON.Vector3, planet: TerritoryState<PlanetState>): void {
        const animation = (Container.get(SceneManagerService).currentCamera as FromAboveCamera).lookAtAnimation(position);
        animation.onAnimationEndObservable.add(() => {
            Container.get(DialogService).open$.next(new UnitOnSquareWarningGuiElement());
            Container.get(SelectedTerritoryService).select(planet.id);
        });
    }
}