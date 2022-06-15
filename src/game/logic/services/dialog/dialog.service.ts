import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../engine/gui-manager/gui-elements/elements/control';
import {Subject} from 'rxjs';

export class DialogService {
    public open$: Subject<Control<GUI.Control>> = new Subject<Control<GUI.Control>>();
    public close$: Subject<void> = new Subject<void>();
}
