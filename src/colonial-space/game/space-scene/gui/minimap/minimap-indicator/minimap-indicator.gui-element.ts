import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {FromAboveCamera} from '../../../../../shared/camera/from-above-camera';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

@GuiElement()
export class MinimapIndicatorGuiElement implements GuiControl<GUI.Rectangle>, OnReady {
    @Inject(CAMERA('space')) private camera: FromAboveCamera;
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    
    public control = new GUI.Rectangle('minimapIndicator');

    public widthInPercentage = 0;
    public heightInPercentage = 0;

    public gameOnInit(): void {
        this.control.width = '30%';
        this.control.height = '20%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.alpha = 1;
        this.control.zIndex = 9999;
    }

    public gameOnReady(): void {
        this.scene.registerBeforeRender(() => {
            this.calculatePosition();
        });
    }

    private calculatePosition(): void {
        let width = ((document.body.clientWidth * 100) / this.camera.widthInPixels);
        let height = ((document.body.clientWidth * 100) / this.camera.widthInPixels) * this.camera.getProportion();
        width = (width * this.camera.radius) / this.camera.upperRadiusLimit;
        height = (height * this.camera.radius) / this.camera.upperRadiusLimit;
        this.widthInPercentage = width;
        this.heightInPercentage = height;

        this.control.width = this.widthInPercentage + '%';
        this.control.height = this.heightInPercentage + '%';

        this.control.left = (this.camera.getXPositionPercentage() - (this.widthInPercentage / 2)) + '%';
        this.control.top = (this.camera.getZPositionPercentage() - (this.heightInPercentage / 2)) + '%';
    }
}
