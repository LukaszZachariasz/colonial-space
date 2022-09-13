import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../../engine/gui-manager/gui-elements/gui-control';
import {Subject} from 'rxjs';

export class DialogService {
    public open$: Subject<GuiControl<GUI.Control>> = new Subject<GuiControl<GUI.Control>>();
    public close$: Subject<void> = new Subject<void>();
}
