import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {HexObject} from './hex-object';

export class Hex implements GameObject {
    public static readonly HexEdgeWidth = 2.7;
    public static readonly HexRadius = (Hex.HexEdgeWidth * Math.sqrt(3)) / 2;
    public static readonly HexWidth = Hex.HexEdgeWidth * 2;
    public static readonly HexHeight = Hex.HexRadius * 2;

    public object: HexObject;

    private scene: BABYLON.Scene;
    private lines: BABYLON.LinesMesh;

    constructor(private position: BABYLON.Vector2) {
    }

    public create(scene: BABYLON.Scene): void {
        this.scene = scene;
        
        const position: BABYLON.Vector3[] = this.generateHexPolygon();
        this.lines = BABYLON.MeshBuilder.CreateLines('hex', {points: position}, this.scene);
        this.lines.alpha = 0.1;
    }

    public setGameObject(hexObject: HexObject): void {
        this.object = hexObject;
        this.object.position = this.position;
        this.object.create(this.scene);
    }

    private generateHexPolygon(): BABYLON.Vector3[] {
        return [
            new BABYLON.Vector3(this.position.x - Hex.HexEdgeWidth, 0, this.position.y),
            new BABYLON.Vector3(this.position.x - (Hex.HexEdgeWidth / 2), 0, this.position.y - Hex.HexRadius),
            new BABYLON.Vector3(this.position.x + (Hex.HexEdgeWidth / 2), 0, this.position.y - Hex.HexRadius),
            new BABYLON.Vector3(this.position.x + Hex.HexEdgeWidth, 0, this.position.y),
            new BABYLON.Vector3(this.position.x + (Hex.HexEdgeWidth / 2), 0, this.position.y + Hex.HexRadius),
            new BABYLON.Vector3(this.position.x - (Hex.HexEdgeWidth / 2), 0, this.position.y + Hex.HexRadius),
            new BABYLON.Vector3(this.position.x - Hex.HexEdgeWidth, 0, this.position.y)
        ];
    }
}