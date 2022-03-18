import * as BABYLON from 'babylonjs';
import {gameState} from '../../core/game-platform';

export const selectCurrentPlayerId = (): string => gameState().player.id;
export const selectPlayerColor = (): BABYLON.Color3 => gameState().player.color;
