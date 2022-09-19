import * as GUI from 'babylonjs-gui';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextOptions} from './text-options';

@GuiComponent()
export class TextGuiComponent implements GuiControl<GUI.TextBlock>, OnInit {
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
