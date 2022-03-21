import * as BABYLON from 'babylonjs';
import {HexTerritoryType} from '../../../../../store/map/hex/hex-territory/hex-territory-type';
import {Model} from '../../model';

export abstract class HexTerritoryModel implements Model {
    public position: BABYLON.Vector2;

    public abstract type: HexTerritoryType;

    public abstract create(scene: BABYLON.Scene): void;
}
