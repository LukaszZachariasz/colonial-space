import {SquareState} from './square/square.state';

export interface MapState {
    skyboxType: string;
    squares: SquareState[][];
}
