import * as GUI from 'babylonjs-gui';

export abstract class Control {
    public abstract render(): GUI.Control;
}
