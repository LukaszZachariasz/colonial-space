import * as GUI from 'babylonjs-gui';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextOptions} from './text-options';

@GuiElement()
export class TextGuiElement implements GuiControl<GUI.TextBlock>, OnInit {
    public control = new GUI.TextBlock(this.text, this.text);

    constructor(public text: string,
                public options?: TextOptions) {
    }

    public gameOnInit(): void {
        this.control.resizeToFit = true;
        this.control.fontFamily = 'JuiceRegular';
        this.control.fontSize = '12px';
        this.control.color = this.options?.color || 'white';

        if (this.options?.uppercase) {
            this.control.text = this.control.text.toUpperCase();
        }
    }
}
