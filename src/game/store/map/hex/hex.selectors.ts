import {HexState} from './hex.state';
import {store} from '../../../game';

export const selectHexById = (id: string): HexState => store().map.hexes.flat().find((el: HexState) => el.id === id);
export const selectPlayerHexes = (playerId: string): HexState[] => store().map.hexes.flat().filter((el: HexState) => el.playerId === playerId);
