import {PlayerState} from './player.state';
import {store} from '../store';

export const selectPlayer = (): PlayerState => store.getState().player;
export const selectPlayerId = (): string => selectPlayer().id;
export const selectPlayerColor = (): string => selectPlayer().color;
