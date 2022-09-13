import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {ControlEvent} from '../../../../../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {
    ControlEventListener
} from '../../../../../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {logic} from '../../../../../../../../../game';
import {
    selectBuildingObjectById,
    selectIsCurrentBuildingByBuildingObjectId
} from '../../../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingObjectSelectGuiElement implements GuiControl<GUI.Button>, AfterCreated, OnReady, OnDestroy {
    public readonly startBuildingLabel = 'Start building';
    public readonly stopBuildingLabel = 'Stop building';
    public control = GUI.Button.CreateSimpleButton('select', this.startBuildingLabel);

    private isCurrentBuilding: boolean;
    private startBuildingSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
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

    public gameOnReady(): void {
        this.startBuildingSubscription = merge(
            of(EMPTY),
            logic().buildingService.startBuildingObject$,
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.isCurrentBuilding = selectIsCurrentBuildingByBuildingObjectId(this.buildingObjectState.id)),
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.createText())
        ).subscribe();
    }

    private onClick(): void {
        if (this.isCurrentBuilding) {
            logic().buildingService.stopBuilding(this.buildingObjectState.id);
        } else {
            logic().buildingService.startBuilding(this.buildingObjectState.id);
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
