import * as BABYLON from 'babylonjs';

export abstract class ModelMesh<T extends BABYLON.AbstractMesh = BABYLON.AbstractMesh> {
    public mesh: T;
}
