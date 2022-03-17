import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../../../gui-objects/gui-object';

export class WaterSectorGuiObject extends GuiObject {
    public button: GUI.Button;

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('waterSector', 'water');
        this.button.width = '100%';
        this.button.height = '100%';
        this.button.background = 'blue';
        return this.button;
    }
}