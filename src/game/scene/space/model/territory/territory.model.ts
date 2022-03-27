import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

export abstract class TerritoryModel implements Model {
    public state: TerritoryState;

    public abstract type: TerritoryType;

    public abstract create(scene: BABYLON.Scene): void;
    
    protected constructor(public id: string) {
        this.state = selectTerritoryById(id);
    }
}
