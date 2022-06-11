import {Container} from '../../../../../../../../engine/gui-manager/gui-elements/container';
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
        super('currentObjectContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl('Current: ' + this.buildingState.currentBuildingObjectId);
    }

    public onBuild(): void {
        this.addControlToContainer(this.textControl);
    }

    public onRegisterListeners(): void {
        this.currentBuildingObjectChangedSubscription = merge(
            of(EMPTY),
            logic().buildingService.startBuildingObject$,
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.buildingState = selectBuildingById(this.planetState.data.buildingId)),
            tap(() => this.textControl.control.text = 'Current: ' + this.buildingState.currentBuildingObjectId)
        ).subscribe();
    }

    public onDestroy(): void {
        this.currentBuildingObjectChangedSubscription?.unsubscribe();
    }
}
