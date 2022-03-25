import * as BABYLON from 'babylonjs';
import {UnitState} from '../../store/unit/unit.state';
import {logic} from '../../game';

export class UnitMovementService {

    public planMovingForUnit(unit: UnitState, destinationSquareId: string): void {
        const destination: BABYLON.Vector2 = logic().squareService.getSquarePosition(destinationSquareId);
        let currentDimensions: BABYLON.Vector2 = logic().squareService.getSquarePosition(unit.squareId);

        console.log(destination.x, destination.y);

        unit.plannedMovement = [];

        while(destination.x !== currentDimensions.x || destination.y !== currentDimensions.y) {
            currentDimensions = new BABYLON.Vector2(
                destination.x === currentDimensions.x ? currentDimensions.x :
                    destination.x > currentDimensions.x ? currentDimensions.x + 1 : currentDimensions.x - 1,

                destination.y === currentDimensions.y ? currentDimensions.y :
                    destination.y > currentDimensions.y ? currentDimensions.y + 1 : currentDimensions.y - 1
            );

            console.log(currentDimensions.x, currentDimensions.y);
            unit.plannedMovement.push(logic().squareService.getSquareByPosition(currentDimensions).id);
        }
        console.log(unit.plannedMovement);
    }
}
