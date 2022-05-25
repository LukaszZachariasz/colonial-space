import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {TextOptions} from './text-options';

export class TextControl extends Control {
    public textBlock: GUI.TextBlock = new GUI.TextBlock(this.text, this.text);

    constructor(private text: string,
                private options?: TextOptions) {
        super();
    }

    public render(): GUI.Control {
        this.textBlock.resizeToFit = true;
        this.textBlock.fontFamily = 'JuiceRegular';
        this.textBlock.fontSize = '12px';
        this.textBlock.color = this.options?.color || 'white';

        if (this.options?.uppercase) {
            this.textBlock.text = this.textBlock.text.toUpperCase();
        }

        return this.textBlock;
    }
}