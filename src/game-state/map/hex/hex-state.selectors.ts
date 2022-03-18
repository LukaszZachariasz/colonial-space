import {HexState} from './hex.state';
import {gameState} from '../../../core/game-platform';

export const selectPlayerHexes = (playerId: string): HexState[] => gameState().map.hexes.flat().filter((el: HexState) => el.playerId === playerId);
