import * as GUI from 'babylonjs-gui';
import {FromAboveCamera} from '../../../../engine/camera/from-above-camera';
import {GuiContainer} from '../gui-container';
import {MinimapIndicatorGuiObject} from './minimap-indicator/minimap-indicator.gui-object';
import {currentCamera} from '../../../../core/game-platform';

export class MinimapGuiContainer extends GuiContainer {
    public minimapIndicatorGuiObject: MinimapIndicatorGuiObject;
    
    private camera: FromAboveCamera = currentCamera() as FromAboveCamera;
    private width = 20;

    public render(): GUI.Control {
        this.container = new GUI.Container('minimap');
        this.container.width = this.width + '%';
        this.container.height = (this.width / this.camera.getProportion()) + '%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.background = 'black';
        this.container.alpha = 0.3;

        this.minimapIndicatorGuiObject = new MinimapIndicatorGuiObject();
        this.container.addControl(this.minimapIndicatorGuiObject.render());

        return this.container;
    }

}