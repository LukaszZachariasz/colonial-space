import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../../core/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from 'typedi';
import {GuiControl} from '../../../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../../../../core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../../../../core/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';
import {TextGuiElement} from '../../../../../../shared/text/text.gui-element';
import {TourService} from '../../../../../../../../../logic/services/tour/tour.service';
import {selectBuildingObjectById} from '../../../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingObjectProductionGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control = new GUI.Container('buildingObjectProduction');

    @AppendGuiControl() private text: TextGuiElement = new TextGuiElement(this.buildingObjectState.productionLeft.toString());

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.text.control.left = '-5%';
    }

    public gameOnReady(): void {
        this.onEndTourSubscription = Container.get(TourService).completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.text.control.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.onEndTourSubscription?.unsubscribe();
    }
}
