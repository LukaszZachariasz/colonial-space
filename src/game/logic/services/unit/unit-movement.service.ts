import * as BABYLON from 'babylonjs';
import {Subject} from 'rxjs';
import {logic} from '../../../game';
import {MapGenerator} from '../../store-generator/map-generator/map.generator';
import {removeFogOfWar, setSquareUnitId} from '../../store/map/map.slice';
import {
    selectSquareArrayPosition,
    selectSquareByArrayPosition,
    selectSquareById,
    selectSquareByUnitId,
    selectSquares
} from '../../store/map/square/square.selectors';
import {SquareState} from '../../store/map/square/square.state';
import {store} from '../../store/store';
import {isAsteroid} from '../../store/territory/asteroid/is-asteroid';
import {isBlackHole} from '../../store/territory/black-hole/is-black-hole';
import {isStar} from '../../store/territory/star/is-star';
import {selectTerritoryById} from '../../store/territory/territory.selectors';
import {selectUnitById} from '../../store/unit/unit.selectors';
import {addUnitPlanningMovement, clearUnitPlanningMovement, moveUnit} from '../../store/unit/unit.slice';
import {UnitState} from '../../store/unit/unit.state';

const PathFinding = require('pathfinding');

export class UnitMovementService {
    public addedPlanMovement$ = new Subject<string>();
    public moveUnit$ = new Subject<string>();

    public handleMovement(squareId: string): void {
        if (!logic().selectedUnitService.selectedUnitId$.value) {
            return;
        }
        const unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

        if (!this.isWalkable(selectSquareById(squareId))) {
            store.dispatch(clearUnitPlanningMovement(unitState.id));
            this.addedPlanMovement$.next(unitState.id);
            return;
        }

        if (unitState.isWorking) {
            return;
        } else if (unitState.movementPointsLeft && unitState.movementPlanning[unitState.movementPlanning.length - 1] === squareId) {
            this.moveUnit$.next(unitState.id);
        } else {
            this.createPlanMovement(unitState.id, squareId);
        }
    }

    public createPlanMovement(unitId: string, destinationSquareId: string): void {
        store.dispatch(clearUnitPlanningMovement(unitId));

        const grid = new PathFinding.Grid(MapGenerator.MapWidth, MapGenerator.MapHeight);

        selectSquares()
            .forEach((squareRow: SquareState[], i: number) => {
                squareRow.forEach((square: SquareState, j: number) => {
                    grid.setWalkableAt(j, i, this.isWalkable(square));
                });
            });

        const startSquare: BABYLON.Vector2 = selectSquareArrayPosition(selectSquareByUnitId(unitId).id);
        const finalSquare: BABYLON.Vector2 = selectSquareArrayPosition(destinationSquareId);

        console.log(startSquare, finalSquare);

        new PathFinding.AStarFinder({
            allowDiagonal: true
        })
            .findPath(startSquare.x, startSquare.y, finalSquare.x, finalSquare.y, grid)
            .forEach(([x, y]: [number, number]) => {
                console.log(x, y);
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
        const movementPoints = Math.min(unit.movementPlanning.length, unit.movementPointsLeft);
        const squarePlannedId = unit.movementPlanning[movementPoints - 1];

        if (!this.isWalkable(selectSquareById(squarePlannedId))) {
            store.dispatch(clearUnitPlanningMovement(unitId));
            return undefined;
        }

        for (let i = 0; i < movementPoints; i++) {
            if (i != 0 && !this.isWalkable(selectSquareById(unit.movementPlanning[i]))) {
                store.dispatch(clearUnitPlanningMovement(unitId));
                return;
            }

            this.scoutTerritory(unit.movementPlanning[i], unit.scoutRange);
        }

        store.dispatch(setSquareUnitId({unitId: null, squareId: selectSquareByUnitId(unitId).id}));
        store.dispatch(moveUnit({id: unitId, amount: movementPoints}));
        store.dispatch(setSquareUnitId({unitId: unitId, squareId: squarePlannedId}));

        const destinationSquare = selectSquareById(squarePlannedId);
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

    private isWalkable(square: SquareState): boolean {
        let isWalkable = true;

        if (!square.fogOfWar) {
            const territory = selectTerritoryById(square.territoryId);
            territory && isAsteroid(territory) && (isWalkable = false);
            territory && isStar(territory) && (isWalkable = false);
            territory && isBlackHole(territory) && (isWalkable = false);
            square.unitId && (isWalkable = false);
        }
        return isWalkable;
    }
}
