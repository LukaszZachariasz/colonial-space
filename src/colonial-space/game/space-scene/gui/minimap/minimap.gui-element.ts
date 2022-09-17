import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {ControlEvent} from '../../../../../core/scene-manager/gui/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../core/scene-manager/gui/gui-elements/events/control-event-listener';
import {FromAboveCamera} from '../../../../shared/camera/from-above-camera';
import {GuiControl} from '../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {MinimapIndicatorGuiElement} from './minimap-indicator/minimap-indicator.gui-element';
import {MinimapObjectsGuiElement} from './minimap-objects/minimap-objects.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class MinimapGuiElement implements GuiControl<GUI.Container>, OnInit {
    @Inject(CAMERA) private camera: FromAboveCamera;
    
    public control: GUI.Container = new GUI.Container('minimap');
    
    @AppendGuiControl() public minimapIndicator: MinimapIndicatorGuiElement = new MinimapIndicatorGuiElement();
    @AppendGuiControl() public minimapObjects: MinimapObjectsGuiElement = new MinimapObjectsGuiElement();

    private isActiveMoving = false;
    private width = 20;

    public gameOnInit(): void {
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
