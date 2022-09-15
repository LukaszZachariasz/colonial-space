import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {AttributeGuiElement} from '../../../../shared/attribute/attribute.gui-element';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../../shared/icon/icon.gui-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {PlanetProductionService} from '../../../../../../game-logic/territory/planet/planet-production.service';
import {PlanetState} from '../../../../../../game-logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../game-logic/store/territory/territory.state';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';
import {TourService} from '../../../../../../game-logic/tour/tour.service';
import {selectTerritoryById} from '../../../../../../game-logic/store/territory/territory.selectors';

@GuiElement()
export class WaterAttributeGuiElement implements GuiControl<GUI.Container>, OnInit, OnReady, OnDestroy {
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

    public gameOnReady(): void {
        this.refreshAfterTourEndSubscription = Injector.inject(TourService).completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attribute.tooltipContent.control as GUI.TextBlock).text = this.generateTooltipContent())
        ).subscribe();
    }

    private generateTooltipContent(): string {
        if (!this.planetState.data.isAnalysed) {
            return 'Water unknown. You need to analise planet firstly';
        }
        return `Water ${this.planetState.data.water}%. 
            
            It's provide ${Injector.inject(PlanetProductionService).getWaterProduction(this.planetState.data.water)} production.`;
    }

    public gameOnDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }
}