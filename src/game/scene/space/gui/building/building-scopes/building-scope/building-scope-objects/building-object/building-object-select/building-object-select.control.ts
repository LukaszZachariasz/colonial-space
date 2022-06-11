import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/control';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {logic} from '../../../../../../../../../game';
import {
    selectBuildingObjectById,
    selectIsCurrentBuildingByBuildingObjectId
} from '../../../../../../../../../logic/store/building/building.selector';

export class BuildingObjectSelectControl extends Control<GUI.Button> {
    private readonly startBuildingLabel = 'Start building';
    private readonly stopBuildingLabel = 'Stop building';

    private isCurrentBuilding: boolean;
    private startBuildingSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public onCreate(): void {
        this.control = GUI.Button.CreateSimpleButton('select', this.startBuildingLabel);
    }

    public onRegisterListeners(): void {
        this.control.onPointerUpObservable.add(() => {
            if (!this.buildingObjectState.isBuilt) {
                this.onClick();
            }
        });

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

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '30px';
        this.control.color = 'red';
        this.control.background = 'black';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    }

    public onDestroy(): void {
        this.startBuildingSubscription?.unsubscribe();
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
}
