import * as BABYLON from 'babylonjs';
import {GalaxySceneGui} from '../../game-scenes/galaxy-scene/gui/galaxy-scene-gui';
import {GameScene} from '../../game-scenes/game-scene';

export class GalaxyOrigin {
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public name = 'Galaxy Origin 01';
    public galaxyScene: GameScene;

    private sphere: BABYLON.Mesh;
    private actionManager: BABYLON.ActionManager;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.Mesh.CreateSphere('galaxyOrigin', 16, 10, scene);
        this.sphere.position = this.position;

        this.actionManager = new BABYLON.ActionManager(scene);
        this.sphere.actionManager = this.actionManager;

        this.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
            if (this.galaxyScene) {
                (this.galaxyScene.gui as GalaxySceneGui).galaxyOriginContent.create();
            }
        }));
    }
}