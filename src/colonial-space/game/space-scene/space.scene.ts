import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

export class SpaceScene implements OnInit {
    @Inject(CAMERA('space')) private camera: FromAboveCamera;
    
    public gameOnInit(): void {
        this.camera.attachControl();
    }
}
