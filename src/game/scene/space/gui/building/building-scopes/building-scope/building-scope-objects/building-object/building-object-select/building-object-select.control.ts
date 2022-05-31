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

export class BuildingObjectSelectControl extends Control {
    public button: GUI.Button;

    private readonly startBuildingLabel = 'Start building';
    private readonly stopBuildingLabel = 'Stop building';

    private isCurrentBuilding: boolean;
    private startBuildingSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('select', this.startBuildingLabel);
        this.button.width = '100%';
        this.button.height = '30px';
        this.button.color = 'red';
        this.button.background = 'black';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.button.onPointerUpObservable.add(() => {
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

        this.button.onDisposeObservable.add(() => {
            this.startBuildingSubscription?.unsubscribe();
        });

        return this.button;
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
            this.button.textBlock.text = this.stopBuildingLabel;
            this.button.textBlock.color = 'blue';
        } else {
            if (this.buildingObjectState.isBuilt) {
                this.button.textBlock.text = 'Already built';
                this.button.textBlock.color = 'grey';
            } else {
                this.button.textBlock.text = this.startBuildingLabel;
                this.button.textBlock.color = 'red';
            }
        }
    }
}
