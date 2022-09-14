import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../core/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {Container} from 'typedi';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../../../core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../../core/lifecycle/on-ready/on-ready';
import {PlanetProductionService} from '../../../../../../../logic/services/territory/planet/planet-production.service';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';
import {TourService} from '../../../../../../../logic/services/tour/tour.service';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetTotalProductionGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('planetTotalProduction');

    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement('Production: ' + Container.get(PlanetProductionService).getTotalProduction(this.planetState.data));

    private endOfTourSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }

    public gameOnReady(): void {
        this.endOfTourSubscription = Container.get(TourService).completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => this.text.control.text = 'Production: ' + Container.get(PlanetProductionService).getTotalProduction(this.planetState.data))
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.endOfTourSubscription?.unsubscribe();
    }
}
