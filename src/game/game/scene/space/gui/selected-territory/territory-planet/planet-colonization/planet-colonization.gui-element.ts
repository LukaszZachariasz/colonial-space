import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../core/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {TourService} from '../../../../../../logic/services/tour/tour.service';
import {ButtonGuiElement} from '../../../shared/button/button.gui-element';
import {ColonialShipState} from '../../../../../../logic/store/unit/colonial-ship/colonial-ship.state';
import {ColonizationService} from '../../../../../../logic/services/colonization/colonization.service';
import {Container} from 'typedi';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetColonizationGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('colonization');

    @AppendGuiControl() public colonizePlanetButton: ButtonGuiElement = new ButtonGuiElement('Colonize planet', () => {
        Container.get(ColonizationService).colonize(this.planetState);
    });

    private colonialShip: UnitState<ColonialShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
    }

    public gameOnReady(): void {
        this.subscription = merge(
            of(EMPTY),
            Container.get(TourService).completeTour$
        ) .pipe(
            tap(() => this.setColonizationStatus())
        ).subscribe();
    }

    private refreshData(): void {
        this.colonialShip = selectUnitByTerritoryId(this.planetState.id);
    }

    private setColonizationStatus(): void {
        this.refreshData();
        this.colonizePlanetButton.control.isEnabled = !(!this.colonialShip || this.colonialShip.type !== UnitType.COLONIAL);
    }

    public gameOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
