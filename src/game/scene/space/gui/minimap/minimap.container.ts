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

        this.container.isPointerBlocker = true;
        this.container.onPointerDownObservable.add((eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState) => {
            this.moveCamera(eventData, eventState);
            this.container.onPointerMoveObservable.add((eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState) => {
                this.moveCamera(eventData, eventState);
            });
        });
        this.container.onPointerUpObservable.add(() => {
            this.container.onPointerMoveObservable.clear();
        });

        return this.container;
    }

    private moveCamera(eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState): void {
        const relativeX = eventData.x - eventState.currentTarget._currentMeasure.left;
        const relativeY = eventData.y - eventState.currentTarget._currentMeasure.top;
        let xPercentage = (relativeX * 100) / eventState.currentTarget._currentMeasure.width;
        let yPercentage = (relativeY * 100) / eventState.currentTarget._currentMeasure.height;

        xPercentage = xPercentage * (100 + this.minimapIndicatorGuiObject.widthInPercentage) / 100;
        xPercentage -= this.minimapIndicatorGuiObject.widthInPercentage / 2;
        if (xPercentage < 0) {
            xPercentage = 0;
        }
        if (xPercentage > 100) {
            xPercentage = 100;
        }

        yPercentage = yPercentage * (100 + this.minimapIndicatorGuiObject.heightInPercentage) / 100;
        yPercentage -= this.minimapIndicatorGuiObject.heightInPercentage / 2;
        if (yPercentage < 0) {
            yPercentage = 0;
        }
        if (yPercentage > 100) {
            yPercentage = 100;
        }

        this.camera.navigateToPercentage(xPercentage, yPercentage);
    }
}
