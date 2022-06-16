import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';
import {logic} from '../../../../../../../game';
import {
    selectBuildingById
} from '../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class PlanetBuildingCurrentObjectGuiElement implements GuiControl<GUI.Container>, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('currentObjectContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement('Current: ' + this.buildingState.currentBuildingObjectId);

    private currentBuildingObjectChangedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnReady(): void {
        this.currentBuildingObjectChangedSubscription = merge(
            of(EMPTY),
            logic().buildingService.startBuildingObject$,
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.buildingState = selectBuildingById(this.planetState.data.buildingId)),
            tap(() => this.text.control.text = 'Current: ' + this.buildingState.currentBuildingObjectId)
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.currentBuildingObjectChangedSubscription?.unsubscribe();
    }
}
