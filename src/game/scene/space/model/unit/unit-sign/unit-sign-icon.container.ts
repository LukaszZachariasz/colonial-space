import {Container} from '../../../../../../engine/gui-manager/container';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class UnitSignIconContainer extends Container {
    public iconControl: IconControl;
    public clicked$ = new Subject<void>();

    constructor(private unitState: UnitState) {
        super('unitSignIcon');
    }

    public onCreate(): void {
        super.onCreate();
        this.iconControl = new IconControl(this.unitState.icon); // TODO: Refactor to lifecycle
    }
    
    public onBuild(): void {
        this.addControlToContainer(this.iconControl);
    }
    
    public onRegisterListeners(): void {
        this.control.onPointerDownObservable.add(() => {
            this.clicked$.next();
        });
    }

    public onApplyStyles(): void {
        this.control.widthInPixels = 1024;
        this.control.heightInPixels = 1024;
        this.iconControl.control.widthInPixels = 1024;
        this.iconControl.control.heightInPixels = 1024;
    }
}
