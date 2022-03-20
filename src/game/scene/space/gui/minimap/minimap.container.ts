import * as GUI from 'babylonjs-gui';
import {Container} from '../container';
import {FromAboveCamera} from '../../camera/from-above-camera';
import {MinimapIndicatorControl} from './minimap-indicator/minimap-indicator.control';
import {sceneManager} from 'engine';

export class MinimapContainer extends Container {
    public minimapIndicatorGuiObject: MinimapIndicatorControl;
    
    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;
    private width = 20;

    public render(): GUI.Control {
        this.container = new GUI.Container('minimap');
        this.container.width = this.width + '%';
        this.container.height = (this.width / this.camera.getProportion()) + '%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.background = 'black';
        this.container.alpha = 0.3;

        this.minimapIndicatorGuiObject = new MinimapIndicatorControl();
        this.container.addControl(this.minimapIndicatorGuiObject.render());

        return this.container;
    }

}
