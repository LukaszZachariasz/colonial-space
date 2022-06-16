import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ControlEvent} from '../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {FromAboveCamera} from '../../camera/from-above-camera';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {MinimapIndicatorGuiElement} from './minimap-indicator/minimap-indicator.gui-element';
import {sceneManager} from 'engine';

@GuiElement()
export class MinimapGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('minimap');
    
    @AppendGuiControl() public minimapIndicator: MinimapIndicatorGuiElement = new MinimapIndicatorGuiElement();

    private isActiveMoving = false;
    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;
    private width = 20;

    public gameAfterCreated(): void {
        this.control.width = this.width + '%';
        this.control.height = (this.width / this.camera.getProportion()) + '%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.background = 'black';
        this.control.alpha = 0.4;
        this.control.isPointerBlocker = true;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public onPointerDown(eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState): void {
        this.moveCamera(eventData, eventState);
        this.isActiveMoving = true;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_MOVE)
    public onPointerMove(eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState): void {
        if (this.isActiveMoving) {
            this.moveCamera(eventData, eventState);
        }
    }

    @ControlEventListener(ControlEvent.ON_POINTER_UP)
    public onPointerUp(): void {
        this.isActiveMoving = false;
    }

    private moveCamera(eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState): void {
        const relativeX = eventData.x - eventState.currentTarget._currentMeasure.left;
        const relativeY = eventData.y - eventState.currentTarget._currentMeasure.top;
        let xPercentage = (relativeX * 100) / eventState.currentTarget._currentMeasure.width;
        let yPercentage = (relativeY * 100) / eventState.currentTarget._currentMeasure.height;

        xPercentage = xPercentage * (100 + this.minimapIndicator.widthInPercentage) / 100;
        xPercentage -= this.minimapIndicator.widthInPercentage / 2;
        if (xPercentage < 0) {
            xPercentage = 0;
        }
        if (xPercentage > 100) {
            xPercentage = 100;
        }

        yPercentage = yPercentage * (100 + this.minimapIndicator.heightInPercentage) / 100;
        yPercentage -= this.minimapIndicator.heightInPercentage / 2;
        if (yPercentage < 0) {
            yPercentage = 0;
        }
        if (yPercentage > 100) {
            yPercentage = 100;
        }

        this.camera.navigateToPercentage(xPercentage, yPercentage);
    }
}
