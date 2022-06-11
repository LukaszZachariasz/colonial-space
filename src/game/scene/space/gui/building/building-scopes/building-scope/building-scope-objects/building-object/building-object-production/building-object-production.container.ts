import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from '../../../../../../../../../../engine/gui-manager/gui-elements/container';
import {Subscription, tap} from 'rxjs';
import {TextControl} from '../../../../../../shared/text/text.control';
import {logic} from '../../../../../../../../../game';
import {selectBuildingObjectById} from '../../../../../../../../../logic/store/building/building.selector';

export class BuildingObjectProductionContainer extends Container {
    private textControl: TextControl;

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
        super('buildingObjectProduction');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl(this.buildingObjectState.productionLeft.toString());
    }

    public onBuild(): void {
        this.addControlToContainer(this.textControl);
    }

    public onRegisterListeners(): void {
        this.onEndTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.textControl.control.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.textControl.control.left = '-5%';
    }

    public onDestroy(): void {
        this.onEndTourSubscription?.unsubscribe();
    }
}
