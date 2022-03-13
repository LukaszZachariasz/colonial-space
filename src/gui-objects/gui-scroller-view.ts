import * as GUI from 'babylonjs-gui';
import {GuiObject} from './gui-object';

export abstract class GuiScrollerView extends GuiObject {
    public scrollViewer: GUI.ScrollViewer;
}
