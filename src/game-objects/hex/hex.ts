import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {HexLines} from './hex-lines/hex-lines';
import {HexPolygon} from './hex-polygon/hex-polygon';
import {HexTerritory} from './hex-territory/hex-territory';

export class Hex implements GameObject {
    public static readonly HexEdgeWidth = 5;
    public static readonly HexRadius = (Hex.HexEdgeWidth * Math.sqrt(3)) / 2;
    public static readonly HexWidth = Hex.HexEdgeWidth * 2;
    public static readonly HexHeight = Hex.HexRadius * 2;

    public territory: HexTerritory;
    public playerId: string | undefined;

    private hexPoints: BABYLON.Vector3[];
    private hexLines: HexLines;
    private hexPolygon: HexPolygon;

    constructor(private position: BABYLON.Vector2) {
        this.hexPoints = this.generateHexPolygon();
    }

    public create(scene: BABYLON.Scene): void {
        this.hexLines = new HexLines(this.hexPoints);
        this.hexPolygon = new HexPolygon(this.hexPoints);

        if (this.playerId) {
            this.hexLines.playerId = this.playerId;
        }

        this.hexLines.create(scene);
        this.hexPolygon.create(scene);

        if (this.territory) {
            this.territory.create(scene);
        }
    }

    public setTerritory(hexTerritory: HexTerritory): void {
        this.territory = hexTerritory;
        this.territory.position = this.position;
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
