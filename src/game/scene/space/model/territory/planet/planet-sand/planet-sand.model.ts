import * as BABYLON from 'babylonjs';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../../logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../../logic/store/map/square/square.selectors';

export class PlanetSandModel extends TerritoryModel {
    public type: TerritoryType = TerritoryType.PLANET_SAND;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    private actionManager: BABYLON.ActionManager;

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);
    }

    public onImport(): Promise<BABYLON.ISceneLoaderAsyncResult> {
        return BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'resources/territory/planet/planet-sand/',
            'planet_01.glb',
            this.scene
        );
    }

    public onReady(): void {
        this.mesh.position = new BABYLON.Vector3(this.square.x, 0, this.square.y);
        this.actionMesh = this.mesh.getChildMeshes()[0];
        super.onReady();

        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                this.actionMesh.overlayColor = new BABYLON.Color3(0.1, 1, 0.2);
                this.actionMesh.overlayAlpha = 0.3;
                this.actionMesh.renderOverlay = true;
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.select();
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                this.actionMesh.renderOverlay = false;
            })
        );
        this.actionMesh.actionManager = this.actionManager;
    }
}
