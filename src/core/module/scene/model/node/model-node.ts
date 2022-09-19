import * as BABYLON from 'babylonjs';

export abstract class ModelNode<T extends BABYLON.Node = BABYLON.Node> {
    public node: T;
}
