import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from './game-object-gui';

export interface GameObjectGuiContainer extends GameObjectGui {
    container: GUI.Container;
}