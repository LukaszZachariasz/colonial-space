import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../engine/gui-manager/gui-elements/elements/control';
import {Subject} from 'rxjs';

export abstract class AbstractMenuBtn extends Control<GUI.Button> {
    public onClick$ = new Subject<void>();

    protected constructor() {
        super();
    }
}
