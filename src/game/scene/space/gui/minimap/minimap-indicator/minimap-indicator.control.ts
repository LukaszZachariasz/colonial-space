import * as GUI from 'babylonjs-gui';
import {Control} from '../../control';
import {FromAboveCamera} from '../../../camera/from-above-camera';
import {sceneManager} from 'engine';

export class MinimapIndicatorControl extends Control {
    public indicator: GUI.Rectangle;

    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;

    public render(): GUI.Control {
        this.indicator = new GUI.Rectangle('minimapIndicator');
        this.indicator.width = '30%';
        this.indicator.height = '20%';
        this.indicator.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.indicator.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.calculatePosition();
        });

        return this.indicator;
    }

    private calculatePosition(): void {
        let width = ((document.body.clientWidth * 100) / this.camera.widthInPixels);
        let height = ((document.body.clientWidth * 100) / this.camera.widthInPixels) * this.camera.getProportion();
        width = (width * this.camera.radius) / this.camera.upperRadiusLimit;
        height = (height * this.camera.radius) / this.camera.upperRadiusLimit;
        this.indicator.width = width + '%';
        this.indicator.height = height + '%';

        this.indicator.left = this.camera.getXPositionPercentage() * (1 - (width / 100)) + '%';
        this.indicator.top = this.camera.getZPositionPercentage() * (1 - (height / 100)) + '%';
    }
}
