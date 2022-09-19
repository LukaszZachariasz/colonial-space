import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetProductionService} from '../../../../../../game-logic/territory/planet/planet-production.service';
import {PlanetState} from '../../../../../../game-logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../game-logic/store/territory/territory.state';
import {TextGuiComponent} from '../../../../../../../shared/gui/text/text.gui-component';
import {TourService} from '../../../../../../game-logic/tour/tour.service';
import {selectTerritoryById} from '../../../../../../game-logic/store/territory/territory.selectors';

@GuiComponent()
export class PlanetTotalProductionGuiComponent implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(PlanetProductionService) private planetProductionService!: PlanetProductionService;
    @Inject(TourService) private tourService: TourService;
    
    public control: GUI.Container = new GUI.Container('planetTotalProduction');

    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent('Production: ' + this.planetProductionService.getTotalProduction(this.planetState.data));

    private endOfTourSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }

    public gameOnLoad(): void {
        this.endOfTourSubscription = this.tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => this.text.control.text = 'Production: ' + this.planetProductionService.getTotalProduction(this.planetState.data))
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.endOfTourSubscription?.unsubscribe();
    }
}
