import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {GameScene} from '../../game-scenes/game-scene';
import {Planet} from '../planet/planet';
import earcut from 'earcut';
import sceneLoader from '../../engine/scene-loader/scene-loader';

export class GalaxyArea implements GameObject {
    public path: BABYLON.Path2;
    public polygon: BABYLON.Mesh;

    public planet: Planet;
    public planetScene: GameScene;
    public actionManager: BABYLON.ActionManager;

    public create(scene: BABYLON.Scene): void {
        const builder = new BABYLON.PolygonMeshBuilder('galaxyArea', this.path, scene, earcut);
        this.polygon = builder.build(false);
        this.polygon.visibility = 0.1;

        if (this.planet) {
            this.planet.create(scene);
        }

        this.actionManager = new BABYLON.ActionManager(scene);
        this.polygon.actionManager = this.actionManager;

        this.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            this.polygon.visibility = 0.2;
        }));

        this.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
            this.polygon.visibility = 0.1;
        }));

        this.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
            if (this.planetScene) {
                sceneLoader.setScenes(this.planetScene);
            }
        }));
    }
}