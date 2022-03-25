import * as GUI from 'babylonjs-gui';
import {Control} from './control';

export abstract class Container extends Control {
    public container: GUI.Container;
}
