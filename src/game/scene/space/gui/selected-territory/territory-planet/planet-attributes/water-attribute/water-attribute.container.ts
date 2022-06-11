import {AttributeContainer} from '../../../../shared/attribute/attribute.container';
import {Container} from '../../../../../../../../engine/gui-manager/gui-elements/container';
import {GameIcon} from '../../../../shared/icon/game-icon';
import {IconControl} from '../../../../shared/icon/icon.control';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

export class WaterAttributeContainer extends Container {
    public attributeControl: AttributeContainer;

    private refreshAfterTourEndSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('waterAttribute');
    }

    public onCreate(): void {
        super.onCreate();
        this.attributeControl = new AttributeContainer(new IconControl(GameIcon.WATER_DROP), new TextControl(this.generateTooltipContent()));
    }

    public onBuild(): void {
        this.addControlToContainer(this.attributeControl);
    }

    public onRegisterListeners(): void {
        this.refreshAfterTourEndSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => (this.attributeControl.tooltipContent as TextControl).text = this.generateTooltipContent())
        ).subscribe();
    }
    
    public onDestroy(): void {
        this.refreshAfterTourEndSubscription?.unsubscribe();
    }

    private generateTooltipContent(): string {
        if (!this.planetState.data.isAnalysed) {
            return 'Water unknown. You need to analise planet firstly';
        }
        return `Water ${this.planetState.data.water}%. 
            
            It's provide ${logic().planetProductionService.getWaterProduction(this.planetState.data.water)} production.`;
    }
}
