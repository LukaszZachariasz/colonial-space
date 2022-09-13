import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../../shared/button/button.gui-element';
import {ColonialShipState} from '../../../../../../logic/store/unit/colonial-ship/colonial-ship.state';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {logic} from '../../../../../../game';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetColonizationGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('colonization');

    @AppendGuiControl() public colonizePlanetButton: ButtonGuiElement = new ButtonGuiElement('Colonize planet', () => {
        logic().colonizationService.colonize(this.planetState);
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
            logic().tourService.completeTour$
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
