import * as BABYLON from 'babylonjs';
import {GameObject} from '../../game-object';

export class HexLines implements GameObject {
    public lines: BABYLON.LinesMesh;


    constructor(private hexPoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        this.lines = BABYLON.MeshBuilder.CreateLines('hex', {points: this.hexPoints}, scene);
        this.lines.alpha = 0.1;
    }

}