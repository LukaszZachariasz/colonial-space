import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/control';
import {Subscription, tap} from 'rxjs';
import {TextControl} from '../../../../../../shared/text/text.control';
import {logic} from '../../../../../../../../../game';
import {selectBuildingObjectById} from '../../../../../../../../../logic/store/building/building.selector';

export class BuildingObjectProductionControl extends Control {
    private textControl: TextControl = new TextControl(this.buildingObjectState.productionLeft.toString());

    private onEndTourSubscription: Subscription;

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.textControl.render();
        this.textControl.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.textControl.textBlock.left = '-5%';

        this.onEndTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.buildingObjectState = selectBuildingObjectById(this.buildingObjectState.id)),
            tap(() => this.textControl.textBlock.text = this.buildingObjectState.productionLeft.toString())
        ).subscribe();

        this.textControl.textBlock.onDisposeObservable.add(() => {
            this.onEndTourSubscription?.unsubscribe();
        });

        return this.textControl.textBlock;
    }
}