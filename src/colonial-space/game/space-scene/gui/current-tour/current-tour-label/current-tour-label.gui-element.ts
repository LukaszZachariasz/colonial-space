import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {selectCurrentTour} from '../../../../game-logic/store/tour/tour.selectors';

@GuiElement()
export class CurrentTourLabelGuiElement implements GuiControl<GUI.TextBlock>, OnReady {
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    
    public control = new GUI.TextBlock('currentTour', 'Current tour: ' + selectCurrentTour());

    public gameOnInit(): void {
        this.control.width = '150px';
        this.control.height = '16px';
        this.control.top = '-60px';
        this.control.color = 'red';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }

    public gameOnReady(): void {
        this.scene.registerBeforeRender(() => {
            this.control.text = 'Current tour: ' + selectCurrentTour();
        });
    }
}
