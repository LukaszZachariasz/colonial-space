import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {selectCurrentTour} from '../../../../game-logic/store/tour/tour.selectors';

@GuiComponent()
export class CurrentTourLabelGuiComponent implements GuiControl<GUI.TextBlock>, OnLoad {
    @Inject(SCENE) private scene: BABYLON.Scene;
    
    public control = new GUI.TextBlock('currentTour', 'Current tour: ' + selectCurrentTour());

    public gameOnInit(): void {
        this.control.width = '150px';
        this.control.height = '16px';
        this.control.top = '-60px';
        this.control.color = 'red';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }

    public gameOnLoad(): void {
        this.scene.registerBeforeRender(() => {
            this.control.text = 'Current tour: ' + selectCurrentTour();
        });
    }
}
