import * as GUI from 'babylonjs-gui';

export abstract class GuiObject {
    public abstract render(): GUI.Control;
}
