import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/module/scene/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelFromFile} from '@colonial-space/core/module/scene/model/from-file/model-from-file';
import {
    ModelResource
} from '@colonial-space/core/module/scene/model/from-file/model-resource.decorator';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';

@ModelResource({
    name: 'MainMenuShip',
    meshUrl: 'resources/unit/scout-ship/',
    meshName: 'scout_ship_01.glb'
})
export class MainMenuShipModel extends ModelFromFile implements OnLoad {
    @Inject(CAMERA) private camera: BABYLON.ArcRotateCamera;

    public gameOnLoad(): void {
        this.camera.lockedTarget = this.primaryMesh;
    }
}
