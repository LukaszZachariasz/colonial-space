import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {GameIcon} from './game-icon';

export class IconControl extends Control<GUI.Image> {
    constructor(private gameIcon: GameIcon) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.Image(this.gameIcon, `resources/gui/icons/${this.gameIcon}.svg`);
    }

    public onApplyStyles(): void {
        this.control.width = '50px';
        this.control.height = '50px';
        this.control.stretch = GUI.Image.STRETCH_FILL;
        this.control.sourceLeft = 0;
        this.control.sourceTop = 0;
        this.control.sourceWidth = 1024;
        this.control.sourceHeight = 1024;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
