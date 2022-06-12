import * as BABYLON from 'babylonjs';
import {Model} from './model';

export abstract class ImportModel extends Model<BABYLON.AbstractMesh> {
    public abstract onImport(): Promise<any>;
}