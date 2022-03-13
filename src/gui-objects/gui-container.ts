import * as GUI from 'babylonjs-gui';
import {GuiObject} from './gui-object';

export abstract class GuiContainer extends GuiObject {
    public container: GUI.Container;
}
