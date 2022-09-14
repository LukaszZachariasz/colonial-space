import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {GameIcon} from './game-icon';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';

@GuiElement()
export class IconGuiElement implements GuiControl<GUI.Image>, AfterCreated {
    public control = new GUI.Image(this.gameIcon, `resources/gui/icons/${this.gameIcon}.svg`);
    
    constructor(private gameIcon: GameIcon) {
    }

    public gameAfterCreated(): void {
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
