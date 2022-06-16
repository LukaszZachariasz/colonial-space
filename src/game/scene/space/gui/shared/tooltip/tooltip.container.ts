import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';

// TODO: improve that class (look at implementations of tooltip)
@GuiElement()
export class TooltipContainer implements GuiControl<GUI.Container>, AfterCreated, OnDestroy {
    public control: GUI.Container = new GUI.Container('tooltipContainer');
    @AppendControl() private tooltipContent: GuiControl<GUI.Control>;

    constructor(tooltipContent: GuiControl<GUI.Control>) {
        this.tooltipContent = tooltipContent;
    }

    public gameAfterCreated(): void {
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tooltipContent.control.setPaddingInPixels(10, 10, 10, 10);
    }

    public gameOnDestroy(): void {
        this.tooltipContent.control.dispose();
    }
}
