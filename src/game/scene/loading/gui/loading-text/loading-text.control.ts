import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../engine/gui-manager/control';

export class LoadingTextControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';

        return this.text;
    }
}
