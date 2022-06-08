import * as GUI from 'babylonjs-gui';
import {AttributeControl} from '../../../../shared/attribute/attribute.control';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {IconControl} from '../../../../shared/icon/icon.control';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

export class WaterAttributeControl extends Control {
    public attributeControl: AttributeControl;

    private refreshAfterTourEndSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }

    public render(): GUI.Control {
        this.attributeControl = new AttributeControl(
            new IconControl(GameIcon.WATER_DROP),
            new TextControl(this.generateTooltipContent()).render()
        );
        this.attributeControl.render();

        this.refreshAfterTourEndSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attributeControl.tooltipContent as GUI.TextBlock).text = this.generateTooltipContent())
        ).subscribe();

        this.attributeControl.iconControl.icon.onDisposeObservable.add(() => {
            this.refreshAfterTourEndSubscription?.unsubscribe();
        });

        return this.attributeControl.iconControl.icon;
    }

    private generateTooltipContent(): string {
        return `Water ${this.planetState.data.water}%. 
            
            It's provide ${logic().planetProductionService.getWaterProduction(this.planetState.data.water)} production.`;
    }
}
