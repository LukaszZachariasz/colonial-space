import * as GUI from 'babylonjs-gui';
import {FromAboveCamera} from '../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {sceneManager} from 'engine';

@GuiElement()
export class MinimapIndicatorGuiElement implements GuiControl<GUI.Rectangle>, OnReady {
    public control = new GUI.Rectangle('minimapIndicator');

    public widthInPercentage = 0;
    public heightInPercentage = 0;

    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;

    public gameAfterCreated(): void {
        this.control.width = '30%';
        this.control.height = '20%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }

    public gameOnReady(): void {
        sceneManager().currentBabylonScene.registerBeforeRender(() => {
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

        this.control.left = this.camera.getXPositionPercentage() * (1 - (this.widthInPercentage / 100)) + '%';
        this.control.top = this.camera.getZPositionPercentage() * (1 - (this.heightInPercentage / 100)) + '%';
    }
}
