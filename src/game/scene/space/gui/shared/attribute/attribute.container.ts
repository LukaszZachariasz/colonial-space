import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {Control} from '../../../../../../engine/gui-manager/control';
import {IconControl} from '../icon/icon.control';
import {TooltipContainer} from '../tooltip/tooltip.container';
import {guiManager} from 'engine';

export class AttributeContainer extends Container {
    public tooltipContainer: TooltipContainer;
    public isVisible = false;

    constructor(public iconControl: IconControl,
                public tooltipContent: Control<GUI.Control>) {
        super('attribute');
    }

    public onBuild(): void {
        this.addControlToContainer(this.iconControl);
    }

    public onRegisterListeners(): void {
        this.iconControl.control.onPointerEnterObservable.add((control: any, eventState: BABYLON.EventState ) => {
            this.tooltipContainer = new TooltipContainer(this.tooltipContent);
            guiManager().appendToRoot(this.tooltipContainer);
            this.tooltipContainer.control.left = eventState.userInfo.localPosition.x + 10 + 'px';
            this.tooltipContainer.control.top = eventState.userInfo.localPosition.y + 'px';
            this.isVisible = true;
        });

        this.iconControl.control.onPointerMoveObservable.add((position: BABYLON.Vector2) => {
            if (!this.tooltipContainer) {
                return;
            }
            this.tooltipContainer.control.left = position.x + 10 + 'px';
            this.tooltipContainer.control.top = position.y + 'px';
        });

        this.iconControl.control.onPointerOutObservable.add(() => {
            this.tooltipContainer.control.dispose();
            this.isVisible = false;
        });
    }

    public onDestroy(): void {
        this.tooltipContainer?.control.dispose();
    }
}
