import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {AttributeGuiElement} from '../../../../shared/attribute/attribute.gui-element';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {GuiControl} from '../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../../shared/icon/icon.gui-element';
import {OnDestroy} from '../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class SunlightAttributeGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('sunlightAttribute');
    
    @AppendGuiControl() public attribute: AttributeGuiElement = new AttributeGuiElement(
        new IconGuiElement(GameIcon.SUN),
        new TextGuiElement(this.generateTooltipContent())
    );

    private refreshAfterTourEndSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }

    public gameOnReady(): void {
        this.refreshAfterTourEndSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attribute.tooltipContent.control as GUI.TextBlock).text = this.generateTooltipContent())
        ).subscribe();
    }

    private generateTooltipContent(): string {
        if (!this.planetState.data.isAnalysed) {
            return 'Sunlight unknown. You need to analise planet firstly';
        }
        return `Sunlight ${this.planetState.data.sunlight}%
            
            It's provide ${logic().planetProductionService.getSunlightProduction(this.planetState.data.sunlight)} production.`;
    }

    public gameOnDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }
}
