import * as GUI from 'babylonjs-gui';
import {GuiObject} from './gui-object';

export abstract class GuiScrollViewer extends GuiObject {
    public scrollViewer: GUI.ScrollViewer;
}
