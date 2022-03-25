import {SquareState} from './square.state';
import {store} from '../../../game';

export const selectSquareById = (id: string): SquareState => store().map.squares.flat().find((el: SquareState) => el.id === id);
export const selectPlayerSquares = (playerId: string): SquareState[] => store().map.squares.flat().filter((el: SquareState) => el.playerId === playerId);
