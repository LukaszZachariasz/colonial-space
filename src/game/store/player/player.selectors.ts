import * as BABYLON from 'babylonjs';
import {store} from '../../game';

export const selectCurrentPlayerId = (): string => store().player.id;
export const selectPlayerColor = (): BABYLON.Color3 => store().player.color;
