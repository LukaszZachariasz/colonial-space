import * as BABYLON from 'babylonjs';
import {Model} from './model';

export abstract class SimpleModel<T extends BABYLON.AbstractMesh | BABYLON.Node> extends Model<T> {
    public abstract onCreate(): void;
}
