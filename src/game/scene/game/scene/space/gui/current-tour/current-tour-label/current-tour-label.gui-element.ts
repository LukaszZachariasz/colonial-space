import * as GUI from 'babylonjs-gui';
import {Container} from 'typedi';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SceneManagerService} from '../../../../../../../core/scene-manager/scene-manager.service';
import {selectCurrentTour} from '../../../../../logic/store/tour/tour.selectors';

@GuiElement()
export class CurrentTourLabelGuiElement implements GuiControl<GUI.TextBlock>, OnReady {
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
        Container.get(SceneManagerService).currentBabylonScene.registerBeforeRender(() => {
            this.control.text = 'Current tour: ' + selectCurrentTour();
        });
    }
}
