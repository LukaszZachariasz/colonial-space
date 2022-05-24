import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {TextControl} from '../text/text.control';

export class TooltipContainer extends Container {
    constructor(private textControl: TextControl) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('tooltip');
        this.container.background = 'rgba(0, 0, 0, 0.3)';
        const text = this.textControl.render();
        text.paddingTop = '10px';
        text.paddingBottom = '10px';
        text.paddingLeft = '10px';
        text.paddingRight = '10px';
        this.container.addControl(text);
        this.container.adaptHeightToChildren = true;
        this.container.adaptWidthToChildren = true;
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        return this.container;
    }
}