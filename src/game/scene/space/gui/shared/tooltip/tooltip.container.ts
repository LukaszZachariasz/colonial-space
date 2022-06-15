import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';

// TODO: improve that class (look at implementations of tooltip)
@GuiElement()
export class TooltipContainer extends Container implements OnDestroy {
    constructor(private tooltipContent: Control<GUI.Control>) {
        super('tooltipContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.tooltipContent.control.setPaddingInPixels(10, 10, 10, 10);
        this.addControlToContainer(this.tooltipContent);
    }

    public gameOnDestroy(): void {
        this.tooltipContent.control.dispose();
    }
}
