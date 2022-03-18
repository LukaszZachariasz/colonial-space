import * as BABYLON from 'babylonjs';
import {GameObject} from '../../game-object';
import {HexTerritoryTypeEnum} from './hex-territory-type.enum';

export abstract class HexTerritory implements GameObject {
    public position: BABYLON.Vector2;

    public abstract type: HexTerritoryTypeEnum;

    public abstract create(scene: BABYLON.Scene): void;
}