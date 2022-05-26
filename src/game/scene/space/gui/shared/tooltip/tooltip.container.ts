import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';

export class TooltipContainer extends Container {
    constructor(private tooltipContent: GUI.Control) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('tooltip');
        this.container.background = 'rgba(0, 0, 0, 0.3)';
        this.tooltipContent.setPaddingInPixels(10, 10, 10, 10);
        this.container.addControl(this.tooltipContent);
        this.container.adaptHeightToChildren = true;
        this.container.adaptWidthToChildren = true;
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        return this.container;
    }
}