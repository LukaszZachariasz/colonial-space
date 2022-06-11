import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {FromAboveCamera} from '../../../camera/from-above-camera';
import {sceneManager} from 'engine';

export class MinimapIndicatorControl extends Control<GUI.Rectangle> {
    public widthInPercentage = 0;
    public heightInPercentage = 0;

    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;

    public onCreate(): void {
        this.control = new GUI.Rectangle('minimapIndicator');
    }

    public onRegisterListeners(): void {
        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.calculatePosition();
        });
    }

    public onApplyStyles(): void {
        this.control.width = '30%';
        this.control.height = '20%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
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
