import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {
    selectBuildingById
} from '../../../../../../../logic/store/building/building.selector';

export class PlanetBuildingCurrentObjectContainer extends Container {
    public textControl: TextControl;
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    private currentBuildingObjectChangedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('currentObjectContainer');
        this.textControl = new TextControl('Current: ' + this.buildingState.currentBuildingObjectId);
        this.container.addControl(this.textControl.render());

        this.currentBuildingObjectChangedSubscription = merge(
            of(EMPTY),
            logic().buildingService.startBuildingObject$,
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.buildingState = selectBuildingById(this.planetState.data.buildingId)),
            tap(() => this.textControl.textBlock.text = 'Current: ' + this.buildingState.currentBuildingObjectId)
        ).subscribe();

        this.container.onDisposeObservable.add(() => {
            this.currentBuildingObjectChangedSubscription?.unsubscribe();
        });

        return this.container;
    }
}
