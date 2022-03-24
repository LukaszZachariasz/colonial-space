import * as BABYLON from 'babylonjs';
import {SquareState} from '../../store/map/square/square.state';
import {store} from '../../game';

export class SquareService {
    public getSquarePosition(squareId: string): BABYLON.Vector2 {
        const flatIndex = store().map.squares.flat().findIndex((el: SquareState) => el.id === squareId);
        const squareWidth = store().map.squares[0].length;
        return new BABYLON.Vector2(flatIndex - (Math.floor(flatIndex / squareWidth) * squareWidth), Math.floor(flatIndex / squareWidth));
    }

    public getSquareByPosition(position: BABYLON.Vector2): SquareState {
        return store().map.squares[position.x][position.y];
    }
}