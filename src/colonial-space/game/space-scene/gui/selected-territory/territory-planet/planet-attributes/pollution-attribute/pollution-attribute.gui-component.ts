import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {AttributeGuiComponent} from '../../../../shared/attribute/attribute.gui-component';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../../../shared/icon/icon.gui-component';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetProductionService} from '../../../../../../game-logic/territory/planet/planet-production.service';
import {PlanetState} from '../../../../../../game-logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../game-logic/store/territory/territory.state';
import {TextGuiComponent} from '../../../../shared/text/text.gui-component';
import {TourService} from '../../../../../../game-logic/tour/tour.service';
import {selectTerritoryById} from '../../../../../../game-logic/store/territory/territory.selectors';

@GuiComponent()
export class PollutionAttributeGuiComponent implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(TourService) private tourService: TourService;
    @Inject(PlanetProductionService) private planetProductionService: PlanetProductionService;
    
    public control: GUI.Container = new GUI.Container('pollutionAttribute');

    @AppendGuiControl() public attribute: AttributeGuiComponent = new AttributeGuiComponent(
        new IconGuiComponent(GameIcon.NUCLEAR_PLANT),
        new TextGuiComponent(this.generateTooltipContent())
    );

    private refreshAfterTourEndSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }

    public gameOnLoad(): void {
        this.refreshAfterTourEndSubscription = this.tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attribute.tooltipContent.control as GUI.TextBlock).text = this.generateTooltipContent())
        ).subscribe();
    }

    private generateTooltipContent(): string {
        if (!this.planetState.data.isAnalysed) {
            return 'Pollution unknown. You need to analise planet firstly';
        }
        return `Pollution ${this.planetState.data.pollution}%
            
            It's provide ${this.planetProductionService.getPollutionProduction(this.planetState.data.pollution)} production.`;
    }

    public gameOnDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }
}
