import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingService} from '../../../../../../game-logic/building/building.service';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetState} from '../../../../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../game-logic/store/territory/territory.state';
import {TextGuiComponent} from '../../../../shared/text/text.gui-component';
import {TourService} from '../../../../../../game-logic/tour/tour.service';
import {
    selectBuildingById
} from '../../../../../../game-logic/store/building/building.selector';

@GuiComponent()
export class PlanetBuildingCurrentObjectGuiComponent implements GuiControl<GUI.Container>, OnLoad, OnDestroy {
    @Inject(BuildingService) private buildingService: BuildingService;
    @Inject(TourService) private tourService: TourService;
    
    public control: GUI.Container = new GUI.Container('currentObjectContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent('Current: ' + this.buildingState.currentBuildingObjectId);

    private currentBuildingObjectChangedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnLoad(): void {
        this.currentBuildingObjectChangedSubscription = merge(
            of(EMPTY),
            this.buildingService.startBuildingObject$,
            this.tourService.completeTour$
        ).pipe(
            tap(() => this.buildingState = selectBuildingById(this.planetState.data.buildingId)),
            tap(() => this.text.control.text = 'Current: ' + this.buildingState.currentBuildingObjectId)
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.currentBuildingObjectChangedSubscription?.unsubscribe();
    }
}
