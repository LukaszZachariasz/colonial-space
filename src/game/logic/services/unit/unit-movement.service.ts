import * as BABYLON from 'babylonjs';
import {Subject} from 'rxjs';
import {addUnitPlanningMovement, clearUnitPlanningMovement, moveUnit} from '../../store/unit/unit.slice';
import {
    selectSquareArrayPosition,
    selectSquareByArrayPosition,
    selectSquareById, selectSquareByUnitId
} from '../../store/map/square/square.selectors';
import {selectUnitById} from '../../store/unit/unit.selectors';
import {setSquareUnitId} from '../../store/map/map.slice';
import {store} from '../../store/store';

export class UnitMovementService {
    public addedPlanMovement$ = new Subject<string>();

    public createPlanMovement(unitId: string, destinationSquareId: string): void {
        const destination: BABYLON.Vector2 = selectSquareArrayPosition(destinationSquareId);
        let currentDimensions: BABYLON.Vector2 = selectSquareArrayPosition(selectSquareByUnitId(unitId).id);

        store.dispatch(clearUnitPlanningMovement(unitId));

        while (destination.x !== currentDimensions.x || destination.y !== currentDimensions.y) {
            currentDimensions = new BABYLON.Vector2(
                destination.x === currentDimensions.x ? currentDimensions.x :
                    destination.x > currentDimensions.x ? currentDimensions.x + 1 : currentDimensions.x - 1,

                destination.y === currentDimensions.y ? currentDimensions.y :
                    destination.y > currentDimensions.y ? currentDimensions.y + 1 : currentDimensions.y - 1
            );

            store.dispatch(addUnitPlanningMovement({
                id: unitId,
                plannedMovementId: selectSquareByArrayPosition(currentDimensions).id
            }));
        }
        this.addedPlanMovement$.next(unitId);
    }

    public moveUnit(unitId: string): BABYLON.Vector2 {
        const unit = selectUnitById(unitId);
        if (unit.plannedMovement.length === 0) {
            return undefined;
        }
        const movement = Math.min(unit.plannedMovement.length, unit.movementSpeed);
        const plannedId = unit.plannedMovement[movement - 1];
        store.dispatch(setSquareUnitId({
            unitId: null,
            squareId: selectSquareByUnitId(unitId).id
        }));
        store.dispatch(moveUnit({
            id: unitId,
            amount: movement
        }));
        store.dispatch(setSquareUnitId({
            unitId: unitId,
            squareId: plannedId
        }));

        const destinationSquare = selectSquareById(plannedId);
        return new BABYLON.Vector2(destinationSquare.x, destinationSquare.y);
    }
}
