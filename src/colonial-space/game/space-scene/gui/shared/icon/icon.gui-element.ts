import * as GUI from 'babylonjs-gui';
import {GameIcon} from './game-icon';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/module/scene/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class IconGuiElement implements GuiControl<GUI.Image>, OnInit {
    public control = new GUI.Image(this.gameIcon, `resources/gui/icons/${this.gameIcon}.svg`);
    
    constructor(private gameIcon: GameIcon) {
    }

    public gameOnInit(): void {
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
