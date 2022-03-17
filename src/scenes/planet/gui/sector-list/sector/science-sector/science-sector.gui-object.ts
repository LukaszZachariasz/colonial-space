import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../../../gui-objects/gui-object';

export class ScienceSectorGuiObject extends GuiObject {
    public button: GUI.Button;

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('scienceSector', 'Science');
        this.button.width = '100%';
        this.button.height = '100%';
        this.button.background = 'green';
        return this.button;
    }
}