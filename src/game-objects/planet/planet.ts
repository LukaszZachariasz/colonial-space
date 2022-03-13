import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {
    PlanetState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {gamePlatform} from '../../core/game-platform';

export class Planet implements GameObject {
    public name: string;
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public size = 1;
    public diffuseTexture = '';

    public state: PlanetState;

    private sphere: BABYLON.Mesh;
    private material: BABYLON.StandardMaterial;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.Mesh.CreateSphere(this.name, 16, this.size, scene);
        this.sphere.position = this.position;
        this.material = new BABYLON.StandardMaterial('ground', scene);
        this.material.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, scene);
        this.sphere.material = this.material;

        const actionManager = new BABYLON.ActionManager(scene);
        this.sphere.actionManager = actionManager;
        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                if (this.state) {
                    gamePlatform().engine.sceneManager.navigateToScene(this.state.sectors[0].name);
                }
            })
        );

        scene.registerBeforeRender(() => {
            this.sphere.rotate(new BABYLON.Vector3(0, -1, -1), 0.001);
        });
    }
}
