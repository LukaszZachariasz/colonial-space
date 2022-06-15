import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from '../../../../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';
import {TextControl} from '../../../../../../shared/text/text.control';
import {logic} from '../../../../../../../../../game';
import {selectBuildingObjectById} from '../../../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingObjectProductionContainer extends Container implements OnReady, OnDestroy {
    private textControl: TextControl;

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
        super('buildingObjectProduction');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl(this.buildingObjectState.productionLeft.toString());
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.textControl.control.left = '-5%';
        this.addControlToContainer(this.textControl);
    }

    public gameOnReady(): void {
        this.onEndTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.textControl.control.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.onEndTourSubscription?.unsubscribe();
    }
}
