import * as BABYLON from 'babylonjs';
import {EMPTY, delay, of, tap} from 'rxjs';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {TerritoryModel} from '../territory.model';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../logic/store/map/square/square.selectors';

export class PlanetModel extends TerritoryModel {
    public type: TerritoryType = TerritoryType.PLANET;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    private actionManager: BABYLON.ActionManager;

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);

        BABYLON.SceneLoader.ImportMesh('', 'resources/territory/planet/', 'planet_01.glb', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(this.square.x, 5, this.square.y);
            this.transformMesh = meshes[0];
            this.actionMesh = meshes[0].getChildMeshes()[0];

            of(EMPTY).pipe(
                tap(() => this.afterModelLoaded()),
                delay(1000),
                tap(() => this.startPlanetShowAnimation()),
                delay(1000),
                tap(() => this.startTerritorySignShowAnimation())
            ).subscribe();

        });
    }

    public afterModelLoaded(): void {
        super.afterModelLoaded();

        this.actionMesh.parent.getChildMeshes().forEach((a: BABYLON.AbstractMesh) => {
            a.isVisible = false;
            a.visibility = 0;
        });
        this.territorySignModel.signMesh.isVisible = false;
        this.territorySignModel.signMesh.visibility = 0;


        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                this.actionMesh.enableEdgesRendering();
                this.actionMesh.edgesWidth = 1.0;
                this.actionMesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.select();
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                this.actionMesh.disableEdgesRendering();
            })
        );
        this.actionMesh.actionManager = this.actionManager;
    }

    private startPlanetShowAnimation(): void {
        this.actionMesh.parent.getChildMeshes().forEach((childMesh: BABYLON.AbstractMesh) => {
            childMesh.isVisible = true;

            BABYLON.Animation.CreateAndStartAnimation(
                'ChangePlanetVisibilityAnim',
                childMesh,
                'visibility',
                30,
                60,
                0.00,
                1,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT
            );
        });
    }

    private startTerritorySignShowAnimation(): void {
        this.territorySignModel.signMesh.isVisible = true;

        BABYLON.Animation.CreateAndStartAnimation(
            'ChangeTerritorySignAnim',
            this.territorySignModel.signMesh,
            'visibility',
            30,
            60,
            0.00,
            1,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT
        );
    }
}
