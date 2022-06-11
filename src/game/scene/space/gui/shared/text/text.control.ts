import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {TextOptions} from './text-options';

export class TextControl extends Control<GUI.TextBlock> {
    constructor(public text: string,
                public options?: TextOptions) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.TextBlock(this.text, this.text);
    }

    public onApplyStyles(): void {
        this.control.resizeToFit = true;
        this.control.fontFamily = 'JuiceRegular';
        this.control.fontSize = '12px';
        this.control.color = this.options?.color || 'white';

        if (this.options?.uppercase) {
            this.control.text = this.control.text.toUpperCase();
        }
    }
}
