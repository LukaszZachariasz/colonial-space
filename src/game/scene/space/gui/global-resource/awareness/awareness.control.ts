import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';

export class AwarenessControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('awareness', 'Awareness: 0');
        return this.text;
    }
}
