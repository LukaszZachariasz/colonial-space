import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {
    PlanetState
} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/planet-state';
import {SceneRoute} from '../../engine/scene-manager/scene-route';
import {sceneManager} from '../../core/game-platform';

export class Planet implements GameObject {
    public name: string;
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public size = 1;
    public diffuseTexture = '';

    public route: SceneRoute;

    public state: PlanetState;

    private sphere: BABYLON.Mesh;
    private material: BABYLON.StandardMaterial;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.Mesh.CreateSphere(this.name, 16, this.size, scene);
        this.sphere.position = this.position;
        this.material = new BABYLON.StandardMaterial('ground', scene);
        this.material.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, scene);
        this.sphere.material = this.material;

        if (this.route) {
            this.routeOnClick(scene);
        }

        scene.registerBeforeRender(() => {
            this.sphere.rotate(new BABYLON.Vector3(0, -1, -1), 0.001);
        });
    }

    private routeOnClick(scene: BABYLON.Scene): void {
        const actionManager = new BABYLON.ActionManager(scene);
        this.sphere.actionManager = actionManager;
        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                sceneManager().navigateToScene(this.route.route);
            })
        );
    }
}
