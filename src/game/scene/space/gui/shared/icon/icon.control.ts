import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {GameIcon} from './game-icon';

export class IconControl extends Control {
    public icon: GUI.Image;

    constructor(private gameIcon: GameIcon) {
        super();
    }

    public render(): GUI.Control {
        this.icon = new GUI.Image(this.gameIcon, `resources/gui/icons/${this.gameIcon}.svg`);
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
