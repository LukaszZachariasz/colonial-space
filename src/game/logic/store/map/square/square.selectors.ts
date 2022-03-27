import * as BABYLON from 'babylonjs';
import {SquareState} from './square.state';
import {store} from '../../store';

export const selectSquares = (): SquareState[][] => store.getState().map.squares;
export const selectRandomEmptySquare = (): SquareState => selectSquares().flat().filter((el: SquareState) => el.territoryId === undefined)[Math.floor(Math.random() * selectSquares().flat().filter((el: SquareState) => el.territoryId === undefined).length)];
export const selectSquaresWithTerritory = (): SquareState[] => selectSquares().flat().filter((squareState: SquareState) => squareState.territoryId !== undefined);
export const selectSquareById = (id: string): SquareState => selectSquares().flat().find((el: SquareState) => el.id === id);
export const selectPlayerSquares = (playerId: string): SquareState[] => selectSquares().flat().filter((el: SquareState) => el.playerId === playerId);

export const selectSquareByTerritoryId = (territoryId: string): SquareState => selectSquaresWithTerritory().find((el: SquareState) => el.territoryId === territoryId);
export const selectSquareByUnitId = (unitId: string): SquareState => selectSquares().flat().find((el: SquareState) => el.unitId === unitId);

export const selectSquareArrayPosition = (id: string): BABYLON.Vector2 => {
    const flatIndex = selectSquares().flat().findIndex((el: SquareState) => el.id === id);
    const squareWidth = selectSquares()[0].length;
    return new BABYLON.Vector2(flatIndex - (Math.floor(flatIndex / squareWidth) * squareWidth), Math.floor(flatIndex / squareWidth));
};
export const selectSquareByArrayPosition = (position: BABYLON.Vector2): SquareState => selectSquares()[position.y][position.x];
