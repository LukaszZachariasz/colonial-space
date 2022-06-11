import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {SunlightAttributeContainer} from './sunlight-attribute/sunlight-attribute.container';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {WaterAttributeContainer} from './water-attribute/water-attribute.container';
import {logic} from '../../../../../../game';
import {selectTerritoryById} from '../../../../../../logic/store/territory/territory.selectors';

export class PlanetAttributesContainer extends Container {
    public sunlightAttributeContainer: SunlightAttributeContainer;
    public waterAttributeContainer: WaterAttributeContainer;

    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('attributes');
    }

    public onCreate(): void {
        super.onCreate();
        this.sunlightAttributeContainer = new SunlightAttributeContainer(this.planetState);
        this.waterAttributeContainer = new WaterAttributeContainer(this.planetState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.sunlightAttributeContainer);
        this.addControlToContainer(this.waterAttributeContainer);
    }

    public onRegisterListeners(): void {
        this.subscription = logic().tourService.completeTour$.pipe(
            tap(() => {
                this.planetState = selectTerritoryById(this.planetState.id);
            })
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.waterAttributeContainer.control.left = '70px';
    }

    public onDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
