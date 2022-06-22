import * as BABYLON from 'babylonjs';
import {MapGenerator} from '../../store-generator/map-generator/map.generator';
import {SquareState} from '../../store/map/square/square.state';
import {Subject} from 'rxjs';
import {UnitState} from '../../store/unit/unit.state';
import {addUnitPlanningMovement, clearUnitPlanningMovement, moveUnit} from '../../store/unit/unit.slice';
import {isAsteroid} from '../../store/territory/asteroid/is-asteroid';
import {isBlackHole} from '../../store/territory/black-hole/is-black-hole';
import {isStar} from '../../store/territory/star/is-star';
import {logic} from '../../../game';
import {removeFogOfWar, setSquareUnitId} from '../../store/map/map.slice';
import {
    selectSquareArrayPosition,
    selectSquareByArrayPosition,
    selectSquareById,
    selectSquareByUnitId,
    selectSquares
} from '../../store/map/square/square.selectors';
import {selectTerritoryById} from '../../store/territory/territory.selectors';
import {selectUnitById} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

const PF = require('pathfinding');

export class UnitMovementService {
    public addedPlanMovement$ = new Subject<string>();
    public moveUnit$ = new Subject<string>();

    public handleMovement(squareId: string): void {
        if (!logic().selectedUnitService.selectedUnitId$.value) {
            return;
        }
        const unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

        if (unitState.movementBlocked) {
            return;
        } else if (unitState.movementPointsLeft && unitState.movementPlanning[unitState.movementPlanning.length - 1] === squareId) {
            this.moveUnit$.next(unitState.id);
        } else {
            this.createPlanMovement(unitState.id, squareId);
        }
    }

    public createPlanMovement(unitId: string, destinationSquareId: string): void {
        store.dispatch(clearUnitPlanningMovement(unitId));

        const grid = new PF.Grid(MapGenerator.MapHeight, MapGenerator.MapWidth);

        selectSquares()
            .forEach((row: SquareState[], i: number) => {
                row.forEach((el: SquareState, j: number) => {
                    let isWalkable = true;
                    const territory = selectTerritoryById(el.territoryId);

                    territory && isAsteroid(territory) && (isWalkable = false);
                    territory && isStar(territory) && (isWalkable = false);
                    territory && isBlackHole(territory) && (isWalkable = false);
                    el.unitId && (isWalkable = false);

                    grid.setWalkableAt(j, i, isWalkable);
                });
            });


        const startSquare: BABYLON.Vector2 = selectSquareArrayPosition(selectSquareByUnitId(unitId).id);
        const finalSquare: BABYLON.Vector2 = selectSquareArrayPosition(destinationSquareId);

        new PF.AStarFinder({
            allowDiagonal: true
        })
            .findPath(startSquare.x, startSquare.y, finalSquare.x, finalSquare.y, grid)
            .forEach(([x, y]: [number, number]) => {
                store.dispatch(addUnitPlanningMovement({
                    id: unitId,
                    plannedMovementId: selectSquareByArrayPosition(new BABYLON.Vector2(x, y)).id
                }));
            });

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
