import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {AttributeContainer} from '../../../../shared/attribute/attribute.container';
import {GuiContainer} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../../shared/icon/icon.control';
import {OnDestroy} from '../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class WaterAttributeContainer extends GuiContainer implements AfterCreated, OnReady, OnDestroy {
    public attributeControl: AttributeContainer;

    private refreshAfterTourEndSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('waterAttribute');
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.attributeControl = new AttributeContainer(new IconControl(GameIcon.WATER_DROP), new TextControl(this.generateTooltipContent()));
        this.addControlToContainer(this.attributeControl);
    }

    public gameOnReady(): void {
        this.refreshAfterTourEndSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attributeControl.tooltipContent.control as GUI.TextBlock).text = this.generateTooltipContent())
        ).subscribe();
    }

    private generateTooltipContent(): string {
        if (!this.planetState.data.isAnalysed) {
            return 'Water unknown. You need to analise planet firstly';
        }
        return `Water ${this.planetState.data.water}%. 
            
            It's provide ${logic().planetProductionService.getWaterProduction(this.planetState.data.water)} production.`;
    }

    public gameOnDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }
}
