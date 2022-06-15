import * as GUI from 'babylonjs-gui';

export abstract class Control<T extends GUI.Control> {
    public control: T;

    public abstract onCreate(): void;
}
