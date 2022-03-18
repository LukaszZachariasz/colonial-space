import * as BABYLON from 'babylonjs';
import {GameObject} from '../../game-object';
import earcut from 'earcut';

export class HexPolygon implements GameObject {
    public polygon: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;

    constructor(private hexPoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        const polygonMeshBuilder = new BABYLON.PolygonMeshBuilder('hexPolygon', this.mapPointsToVector2(), scene, earcut);
        this.polygon = polygonMeshBuilder.build(true);

        this.material = new BABYLON.StandardMaterial('hexPolygonMaterial', scene);
        this.material.alpha = 0;
        this.polygon.material = this.material;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(scene);
        this.polygon.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            })
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
            })
        );

    }

    private mapPointsToVector2(): BABYLON.Vector2[] {
        return this.hexPoints.map((point: BABYLON.Vector3) => new BABYLON.Vector2(point.x, point.z));
    }
}