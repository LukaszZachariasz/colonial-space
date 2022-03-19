import * as GUI from 'babylonjs-gui';
import {FromAboveCamera} from '../../../../../engine/camera/from-above-camera';
import {GuiObject} from '../../gui-object';
import {currentBabylonScene, currentCamera} from '../../../../../core/game-platform';

export class MinimapIndicatorGuiObject extends GuiObject {
    public indicator: GUI.Rectangle;

    private camera: FromAboveCamera = currentCamera() as FromAboveCamera;

    public render(): GUI.Control {
        this.indicator = new GUI.Rectangle('minimapIndicator');
        this.indicator.width = '30%';
        this.indicator.height = '20%';
        this.indicator.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.indicator.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        currentBabylonScene().registerBeforeRender(() => {
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

        this.indicator.top = ((-this.camera.target.z * 100 * FromAboveCamera.CameraUnitPerPixel) / (this.camera.heightInPixels)) + '%';
        this.indicator.left = ((this.camera.target.x * 100 * FromAboveCamera.CameraUnitPerPixel - width) / (this.camera.widthInPixels)) + '%';
    }
}