import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../game/scene/space/gui/control';
import {Subject} from 'rxjs';


export abstract class AbstractMenuBtn extends Control {
    protected btn = new GUI.Button();

    public onClick$ = new Subject<void>();

    protected abstract generateButton(): void;

    protected constructor() {
        super();

        this.generateButton();

        this.btn.onPointerClickObservable.add(() => this.onClick$.next());
    }
}
