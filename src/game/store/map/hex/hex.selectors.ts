import {HexState} from './hex.state';
import {store} from '../../../game';

export const selectPlayerHexes = (playerId: string): HexState[] => store().map.hexes.flat().filter((el: HexState) => el.playerId === playerId);
