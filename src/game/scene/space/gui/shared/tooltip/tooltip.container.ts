import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {Control} from '../../../../../../engine/gui-manager/control';

export class TooltipContainer extends Container {
    constructor(private tooltipContent: Control<GUI.Control>) {
        super('tooltipContainer');
    }

    public onBuild(): void {
        this.addControlToContainer(this.tooltipContent);
    }

    public onApplyStyles(): void {
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.tooltipContent.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
