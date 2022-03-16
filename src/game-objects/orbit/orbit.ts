import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {Planet} from '../planet/planet';

export class Orbit implements GameObject {
    public originPosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public radius: number;
    public planet: Planet;
    public planetCurrentPosition: number;

    private color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

    public create(scene: BABYLON.Scene): void {
        const mySinus = [];
        for (let i = -Math.PI; i <= Math.PI; i += Math.PI / 360) {
            mySinus.push(new BABYLON.Vector3(this.radius * Math.cos(i), 0, this.radius * Math.sin(i)));
        }
        const baseCircle = BABYLON.Mesh.CreateLines('qbezier2', mySinus, scene);
        baseCircle.color = this.color;
        baseCircle.alpha = 0.5;

        const x = this.radius * Math.cos(this.planetCurrentPosition * 360);
        const z = this.radius * Math.sin(this.planetCurrentPosition * 360);
        this.planet.position = new BABYLON.Vector3(x, 0, z);
        this.planet.create(scene);
    }
}