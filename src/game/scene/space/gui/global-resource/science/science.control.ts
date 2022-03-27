import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';

export class ScienceControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('science', 'Science: 0');
        return this.text;
    }
}
