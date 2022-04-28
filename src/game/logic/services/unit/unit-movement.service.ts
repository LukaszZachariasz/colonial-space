import * as BABYLON from 'babylonjs';
import {Subject, switchMap, take} from 'rxjs';
import {addUnitPlanningMovement, clearUnitPlanningMovement, moveUnit} from '../../store/unit/unit.slice';
import {logic} from '../../../game';
import {removeFogOfWar, setSquareUnitId} from '../../store/map/map.slice';
import {
    selectSquareArrayPosition,
    selectSquareByArrayPosition,
    selectSquareById, selectSquareByUnitId
} from '../../store/map/square/square.selectors';
import {selectUnitById} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

export class UnitMovementService {
    public addedPlanMovement$ = new Subject<string>();

    public handleMovement(squareId: string): void {
        if (!logic().selectedUnitService.selectedUnit$.value) {
            return;
        }
        const unitState = selectUnitById(logic().selectedUnitService.selectedUnit$.value.unitId);
        const selectedUnit = logic().selectedUnitService.selectedUnit$.value;

        if (unitState.movementPointsLeft && unitState.movementPlanning[unitState.movementPlanning.length - 1] === squareId) {
            selectedUnit.unitMovement.initMove().pipe(
                take(1),
                switchMap(() => selectedUnit.unitMovement.rotation().pipe(take(1))),
                switchMap(() => selectedUnit.unitMovement.move().pipe(take(1)))
            ).subscribe();
        } else {
            this.createPlanMovement(selectedUnit.unitId, squareId);
        }
    }

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
        if (!unit.movementPlanning.length || !unit.movementPointsLeft) {
            return undefined;
        }
        const movement = Math.min(unit.movementPlanning.length, unit.movementPointsLeft);
        const plannedId = unit.movementPlanning[movement - 1];

        for (let i = 0; i < movement; i++) {
            this.scoutTerritory(unit.movementPlanning[i], unit.scoutRange);
        }

        store.dispatch(setSquareUnitId({unitId: null, squareId: selectSquareByUnitId(unitId).id}));
        store.dispatch(moveUnit({id: unitId, amount: movement}));
        store.dispatch(setSquareUnitId({unitId: unitId, squareId: plannedId}));

        const destinationSquare = selectSquareById(plannedId);
        return new BABYLON.Vector2(destinationSquare.x, destinationSquare.y);
    }

    public scoutTerritory(squareId: string, range: number): void {
        store.dispatch(removeFogOfWar({
            position: {
                x: selectSquareArrayPosition(squareId).x,
                y: selectSquareArrayPosition(squareId).y
            },
            range: range
        }));
    }
}
