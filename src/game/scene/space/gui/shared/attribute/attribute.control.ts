import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {IconControl} from '../icon/icon.control';
import {TooltipContainer} from '../tooltip/tooltip.container';
import {guiManager} from 'engine';

export class AttributeControl extends Control {
    public tooltipContainer: TooltipContainer;

    constructor(public iconControl: IconControl,
                public tooltipContent: GUI.Control) {
        super();
    }

    public render(): GUI.Control {
        this.iconControl.render();

        this.iconControl.icon.onPointerEnterObservable.add((control: any, eventState: BABYLON.EventState ) => {
            this.tooltipContainer = new TooltipContainer(this.tooltipContent);
            guiManager().advancedDynamicTexture.addControl(this.tooltipContainer.render());
            this.tooltipContainer.container.left = eventState.userInfo.localPosition.x + 10 + 'px';
            this.tooltipContainer.container.top = eventState.userInfo.localPosition.y + 'px';
        });

        this.iconControl.icon.onPointerMoveObservable.add((position: BABYLON.Vector2) => {
            if (!this.tooltipContainer) {
                return;
            }
            this.tooltipContainer.container.left = position.x + 10, + 'px';
            this.tooltipContainer.container.top = position.y + 'px';
        });

        this.iconControl.icon.onPointerOutObservable.add(() => {
            this.tooltipContainer.container.dispose();
        });

        return this.iconControl.icon;
    }
}