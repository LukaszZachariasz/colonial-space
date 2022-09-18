import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {AttributeGuiElement} from '../../../../shared/attribute/attribute.gui-element';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/module/scene/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../../../shared/icon/icon.gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetProductionService} from '../../../../../../game-logic/territory/planet/planet-production.service';
import {PlanetState} from '../../../../../../game-logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../game-logic/store/territory/territory.state';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';
import {TourService} from '../../../../../../game-logic/tour/tour.service';
import {selectTerritoryById} from '../../../../../../game-logic/store/territory/territory.selectors';

@GuiElement()
export class WaterAttributeGuiElement implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(TourService) private tourService: TourService;
    @Inject(PlanetProductionService) private planetProductionService: PlanetProductionService;
    
    public control: GUI.Container = new GUI.Container('waterAttribute');

    @AppendGuiControl() public attribute: AttributeGuiElement = new AttributeGuiElement(
        new IconGuiElement(GameIcon.WATER_DROP),
        new TextGuiElement(this.generateTooltipContent())
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
            return 'Water unknown. You need to analise planet firstly';
        }
        return `Water ${this.planetState.data.water}%. 
            
            It's provide ${this.planetProductionService.getWaterProduction(this.planetState.data.water)} production.`;
    }

    public gameOnDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }
}
