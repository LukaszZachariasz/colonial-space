import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendControl
} from '../../../../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';
import {TextControl} from '../../../../../../shared/text/text.control';
import {logic} from '../../../../../../../../../game';
import {selectBuildingObjectById} from '../../../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingObjectProductionContainer implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control = new GUI.Container('buildingObjectProduction');

    @AppendControl() private textControl: TextControl = new TextControl(this.buildingObjectState.productionLeft.toString());

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.textControl.control.left = '-5%';
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
