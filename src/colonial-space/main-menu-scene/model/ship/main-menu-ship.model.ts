import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {GameObjectFromFile} from '@colonial-space/core/module/scene/model/game-object';
import {ImportModelAbstract} from '@colonial-space/core/module/scene/model/model-elements/import-model';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';

@GameObjectFromFile({
    name: 'MainMenuShip',
    meshUrl: 'resources/unit/scout-ship/',
    meshName: 'scout_ship_01.glb'
})
export class MainMenuShipModel extends ImportModelAbstract implements OnLoad {
    @Inject(CAMERA) private camera: BABYLON.ArcRotateCamera;

    public gameOnLoad(): void {
        this.camera.lockedTarget = this.primaryMesh;
    }
}
