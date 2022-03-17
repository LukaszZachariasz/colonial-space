import * as BABYLON from 'babylonjs';
import {HexObject} from '../hex-object';

export class Planet extends HexObject {
    public sphere: BABYLON.Mesh;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.MeshBuilder.CreateSphere('test', {segments: 16}, scene);
        this.sphere.position = new BABYLON.Vector3(this.position.x, 1, this.position.y);
    }
}