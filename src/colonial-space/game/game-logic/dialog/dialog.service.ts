import {GuiControl} from '../../../../core/module/scene/gui/gui-component/gui-control';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Subject} from 'rxjs';

@Injectable()
export class DialogService {
    public open$: Subject<GuiControl> = new Subject<GuiControl>();
    public close$: Subject<void> = new Subject<void>();
}
