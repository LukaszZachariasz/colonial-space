import * as BABYLON from 'babylonjs';
import {HexLinesModel} from './hex-lines/hex-lines.model';
import {HexPolygonModel} from './hex-polygon/hex-polygon.model';
import {HexTerritoryModel} from './hex-territory/hex-territory.model';
import {Model} from '../model';
import {UnitModel} from './unit/unit.model';

export class HexModel implements Model {
    public static readonly HexEdgeWidth = 5;
    public static readonly HexRadius = (HexModel.HexEdgeWidth * Math.sqrt(3)) / 2;
    public static readonly HexWidth = HexModel.HexEdgeWidth * 2;
    public static readonly HexHeight = HexModel.HexRadius * 2;

    public territory: HexTerritoryModel;
    public unit: UnitModel;
    public playerId: string | undefined;

    private readonly hexPoints: BABYLON.Vector3[];
    private hexLines: HexLinesModel;
    private hexPolygon: HexPolygonModel;

    constructor(private position: BABYLON.Vector2) {
        this.hexPoints = this.generateHexPolygon();
    }

    public create(scene: BABYLON.Scene): void {
        this.hexLines = new HexLinesModel(this.hexPoints);
        this.hexPolygon = new HexPolygonModel(this.hexPoints);

        if (this.playerId) {
            this.hexLines.playerId = this.playerId;
        }

        this.hexLines.create(scene);
        this.hexPolygon.create(scene);

        if (this.territory) {
            this.territory.create(scene);
        }
        
        if (this.unit) {
            this.unit.create(scene);
        }
    }

    public setTerritory(hexTerritory: HexTerritoryModel): void {
        this.territory = hexTerritory;
        this.territory.position = this.position;
    }

    public setUnit(unit: UnitModel): void {
        this.unit = unit;
        this.unit.position = new BABYLON.Vector3(this.position.x, 0, this.position.y);
    }

    private generateHexPolygon(): BABYLON.Vector3[] {
        return [
            new BABYLON.Vector3(this.position.x - HexModel.HexEdgeWidth, 0, this.position.y),
            new BABYLON.Vector3(this.position.x - (HexModel.HexEdgeWidth / 2), 0, this.position.y - HexModel.HexRadius),
            new BABYLON.Vector3(this.position.x + (HexModel.HexEdgeWidth / 2), 0, this.position.y - HexModel.HexRadius),
            new BABYLON.Vector3(this.position.x + HexModel.HexEdgeWidth, 0, this.position.y),
            new BABYLON.Vector3(this.position.x + (HexModel.HexEdgeWidth / 2), 0, this.position.y + HexModel.HexRadius),
            new BABYLON.Vector3(this.position.x - (HexModel.HexEdgeWidth / 2), 0, this.position.y + HexModel.HexRadius),
            new BABYLON.Vector3(this.position.x - HexModel.HexEdgeWidth, 0, this.position.y)
        ];
    }
}
