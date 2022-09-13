import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextOptions} from './text-options';

@GuiElement()
export class TextGuiElement implements GuiControl<GUI.TextBlock>, AfterCreated {
    public control = new GUI.TextBlock(this.text, this.text);

    constructor(public text: string,
                public options?: TextOptions) {
    }

    public gameAfterCreated(): void {
        this.control.resizeToFit = true;
        this.control.fontFamily = 'JuiceRegular';
        this.control.fontSize = '12px';
        this.control.color = this.options?.color || 'white';

        if (this.options?.uppercase) {
            this.control.text = this.control.text.toUpperCase();
        }
    }
}
