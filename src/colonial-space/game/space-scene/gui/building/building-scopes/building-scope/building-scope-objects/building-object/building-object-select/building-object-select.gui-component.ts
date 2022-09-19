import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {BuildingService} from '../../../../../../../../game-logic/building/building.service';
import {ControlEvent} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event';
import {
    ControlEventListener
} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event-listener';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {TourService} from '../../../../../../../../game-logic/tour/tour.service';
import {
    selectBuildingObjectById,
    selectIsCurrentBuildingByBuildingObjectId
} from '../../../../../../../../game-logic/store/building/building.selector';

@GuiComponent()
export class BuildingObjectSelectGuiComponent implements GuiControl<GUI.Button>, OnInit, OnLoad, OnDestroy {
    @Inject(BuildingService) private buildingService: BuildingService;
    @Inject(TourService) private tourService: TourService;
    
    public readonly startBuildingLabel = 'Start building';
    public readonly stopBuildingLabel = 'Stop building';
    public control = GUI.Button.CreateSimpleButton('select', this.startBuildingLabel);

    private isCurrentBuilding: boolean;
    private startBuildingSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '30px';
        this.control.color = 'red';
        this.control.background = 'black';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_UP)
    public onSelect(): void {
        if (!this.buildingObjectState.isBuilt) {
            this.onClick();
        }
    }

    public gameOnLoad(): void {
        this.startBuildingSubscription = merge(
            of(EMPTY),
            this.buildingService.startBuildingObject$,
            this.tourService.completeTour$
        ).pipe(
            tap(() => this.isCurrentBuilding = selectIsCurrentBuildingByBuildingObjectId(this.buildingObjectState.id)),
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.createText())
        ).subscribe();
    }

    private onClick(): void {
        if (this.isCurrentBuilding) {
            this.buildingService.stopBuilding(this.buildingObjectState.id);
        } else {
            this.buildingService.startBuilding(this.buildingObjectState.id);
        }
    }

    private createText(): void {
        if (this.isCurrentBuilding) {
            this.control.textBlock.text = this.stopBuildingLabel;
            this.control.textBlock.color = 'blue';
        } else {
            if (this.buildingObjectState.isBuilt) {
                this.control.textBlock.text = 'Already built';
                this.control.textBlock.color = 'grey';
            } else {
                this.control.textBlock.text = this.startBuildingLabel;
                this.control.textBlock.color = 'red';
            }
        }
    }

    public gameOnDestroy(): void {
        this.startBuildingSubscription?.unsubscribe();
    }
}