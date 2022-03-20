import * as BABYLON from 'babylonjs';
import {HexTerritoryTypeEnum} from './hex-territory-type.enum';
import {Model} from '../../model';

export abstract class HexTerritoryModel implements Model {
    public position: BABYLON.Vector2;

    public abstract type: HexTerritoryTypeEnum;

    public abstract create(scene: BABYLON.Scene): void;
}
