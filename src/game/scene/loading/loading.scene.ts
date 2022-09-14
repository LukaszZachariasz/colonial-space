import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {LoadingGui} from './gui/loading.gui';
import {ModelManagerService} from '../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';

export class LoadingScene implements OnInit {
    public gui: LoadingGui = new LoadingGui();
    
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    
    @Inject(SCENE('loading')) private scene: BABYLON.Scene;
    @Inject(CAMERA('loading')) private camera: BABYLON.Camera;

    public gameOnInit(): void {
        this.modelManagerService.addSimpleModel(new SpaceSkybox(this.scene));

        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
