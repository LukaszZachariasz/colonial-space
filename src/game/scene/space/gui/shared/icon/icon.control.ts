import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';

export class IconControl extends Control {
    public icon: GUI.Image;

    constructor(private name: string) {
        super();
    }

    public render(): GUI.Control {
        this.icon = new GUI.Image(this.name, `resources/gui/icons/${this.name}.svg`);
        this.icon.width = '50px';
        this.icon.height = '50px';
        this.icon.stretch = GUI.Image.STRETCH_FILL;
        this.icon.sourceLeft = 0;
        this.icon.sourceTop = 0;
        this.icon.sourceWidth = 1024;
        this.icon.sourceHeight = 1024;
        this.icon.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.icon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        return this.icon;
    }
}
