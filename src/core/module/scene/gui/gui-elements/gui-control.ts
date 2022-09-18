import * as GUI from 'babylonjs-gui';

export interface GuiControl<T extends GUI.Control> {
    control: T;
}
