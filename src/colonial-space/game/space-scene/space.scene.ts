import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SpaceSceneBuilderService} from './services/space-scene-builder/space-scene-builder.service';

export class SpaceScene implements OnInit {
    @Inject(CAMERA) private camera: FromAboveCamera;
    @Inject(SpaceSceneBuilderService) private spaceSceneBuilderService: SpaceSceneBuilderService;
    
    public gameOnInit(): void {
        this.spaceSceneBuilderService.build();
        this.camera.attachControl();
    }
}
