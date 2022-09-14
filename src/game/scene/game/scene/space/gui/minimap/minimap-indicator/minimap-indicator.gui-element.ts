import * as GUI from 'babylonjs-gui';
import {Container} from 'typedi';
import {FromAboveCamera} from '../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SceneManagerService} from '../../../../../../../core/scene-manager/scene-manager.service';

@GuiElement()
export class MinimapIndicatorGuiElement implements GuiControl<GUI.Rectangle>, OnReady {
    public control = new GUI.Rectangle('minimapIndicator');

    public widthInPercentage = 0;
    public heightInPercentage = 0;

    private camera: FromAboveCamera = Container.get(SceneManagerService).currentCamera as FromAboveCamera;

    public gameOnInit(): void {
        this.control.width = '30%';
        this.control.height = '20%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.alpha = 1;
        this.control.zIndex = 9999;
    }

    public gameOnReady(): void {
        Container.get(SceneManagerService).currentBabylonScene.registerBeforeRender(() => {
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
