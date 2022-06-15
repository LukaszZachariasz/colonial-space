import {Container} from '../../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {
    selectBuildingById
} from '../../../../../../../logic/store/building/building.selector';

@GuiElement()
export class PlanetBuildingCurrentObjectContainer extends Container implements OnReady, OnDestroy {
    public textControl: TextControl;
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    private currentBuildingObjectChangedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('currentObjectContainer');
    }

    public onCreate(): void {
        super.onCreate();

        this.textControl = new TextControl('Current: ' + this.buildingState.currentBuildingObjectId);
        this.addControlToContainer(this.textControl);
    }

    public gameOnReady(): void {
        this.currentBuildingObjectChangedSubscription = merge(
            of(EMPTY),
            logic().buildingService.startBuildingObject$,
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.buildingState = selectBuildingById(this.planetState.data.buildingId)),
            tap(() => this.textControl.control.text = 'Current: ' + this.buildingState.currentBuildingObjectId)
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.currentBuildingObjectChangedSubscription?.unsubscribe();
    }
}
