import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../gui-objects/gui-object';

export class LoadingTextGuiObject extends GuiObject {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';

        return this.text;
    }
}
