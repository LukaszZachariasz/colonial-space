import * as GUI from 'babylonjs-gui';
import {Control} from '../../../space/gui/control';

export class LoadingTextGuiObject extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';

        return this.text;
    }
}
