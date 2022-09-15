import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';
import {TextGuiElement} from '../../../../../../shared/text/text.gui-element';
import {TourService} from '../../../../../../../../game-logic/tour/tour.service';
import {selectBuildingObjectById} from '../../../../../../../../game-logic/store/building/building.selector';

@GuiElement()
export class BuildingObjectProductionGuiElement implements GuiControl<GUI.Container>, OnInit, OnReady, OnDestroy {
    public control = new GUI.Container('buildingObjectProduction');

    @AppendGuiControl() private text: TextGuiElement = new TextGuiElement(this.buildingObjectState.productionLeft.toString());

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.text.control.left = '-5%';
    }

    public gameOnReady(): void {
        this.onEndTourSubscription = Injector.inject(TourService).completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.text.control.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.onEndTourSubscription?.unsubscribe();
    }
}
