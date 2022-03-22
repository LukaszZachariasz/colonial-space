import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';

export abstract class TerritoryModel implements Model {
    public state: TerritoryState;

    public abstract type: TerritoryType;

    public abstract create(scene: BABYLON.Scene): void;
}
