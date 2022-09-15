import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../../shared/button/button.gui-element';
import {ColonialShipState} from '../../../../../game-logic/store/unit/colonial-ship/colonial-ship.state';
import {ColonizationService} from '../../../../../game-logic/colonization/colonization.service';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../../../game-logic/store/unit/unit-type';
import {selectUnitByTerritoryId} from '../../../../../game-logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetColonizationGuiElement implements GuiControl<GUI.Container>, OnInit, OnLoad {
    @Inject(ColonizationService) private colonizationService: ColonizationService;
    @Inject(TourService) private tourService: TourService;

    public control: GUI.Container = new GUI.Container('colonization');

    @AppendGuiControl() public colonizePlanetButton: ButtonGuiElement = new ButtonGuiElement('Colonize planet', () => {
        this.colonizationService.colonize(this.planetState);
    });

    private colonialShip: UnitState<ColonialShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
    }

    public gameOnLoad(): void {
        this.subscription = merge(
            of(EMPTY),
            this.tourService.completeTour$
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
