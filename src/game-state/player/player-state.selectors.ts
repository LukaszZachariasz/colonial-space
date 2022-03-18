import {gameState} from '../../core/game-platform';

export const selectPlayerId = (): string => gameState().player.id;
