import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../core/gui-manager/gui-elements/gui-control';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Subject} from 'rxjs';

@Injectable()
export class DialogService {
    public open$: Subject<GuiControl<GUI.Control>> = new Subject<GuiControl<GUI.Control>>();
    public close$: Subject<void> = new Subject<void>();
}
