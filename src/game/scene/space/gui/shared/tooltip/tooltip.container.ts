import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';

// TODO: improve that class (look at implementations of tooltip)
@GuiElement()
export class TooltipContainer extends GuiContainer implements AfterCreated, OnDestroy {
    constructor(private tooltipContent: GuiControl<GUI.Control>) {
        super('tooltipContainer');
    }

    public gameAfterCreated(): void {
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
