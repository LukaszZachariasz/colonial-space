import * as GUI from 'babylonjs-gui';
import {Subject} from 'rxjs';

export class DialogService {
    public open$: Subject<GUI.Control> = new Subject<GUI.Control>();
    public close$: Subject<void> = new Subject<void>();
}
