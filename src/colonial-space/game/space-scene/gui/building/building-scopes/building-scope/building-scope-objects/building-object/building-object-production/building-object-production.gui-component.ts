import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {Subscription, tap} from 'rxjs';
import {TextGuiComponent} from '../../../../../../shared/text/text.gui-component';
import {TourService} from '../../../../../../../../game-logic/tour/tour.service';
import {selectBuildingObjectById} from '../../../../../../../../game-logic/store/building/building.selector';

@GuiComponent()
export class BuildingObjectProductionGuiComponent implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(TourService) private tourService: TourService;
    public control = new GUI.Container('buildingObjectProduction');

    @AppendGuiControl() private text: TextGuiComponent = new TextGuiComponent(this.buildingObjectState.productionLeft.toString());

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.text.control.left = '-5%';
    }

    public gameOnLoad(): void {
        this.onEndTourSubscription = this.tourService.completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.text.control.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.onEndTourSubscription?.unsubscribe();
    }
}
