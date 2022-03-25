import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../engine/gui-manager/control';
import {Subject} from 'rxjs';


export abstract class AbstractMenuBtn extends Control {
    protected btn = new GUI.Button();
    public onClick$ = new Subject<void>();

    protected constructor() {
        super();
        this.btn.onPointerClickObservable.add(() => this.onClick$.next());
    }
}
