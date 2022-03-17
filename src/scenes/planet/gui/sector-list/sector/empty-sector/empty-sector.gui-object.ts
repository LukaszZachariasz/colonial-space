import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../../../gui-objects/gui-object';

export class EmptySectorGuiObject extends GuiObject {

    public render(): GUI.Control {
        // Empty sector
        return null;
    }
}