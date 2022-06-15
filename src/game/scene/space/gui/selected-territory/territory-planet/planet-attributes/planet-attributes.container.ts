import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {SunlightAttributeContainer} from './sunlight-attribute/sunlight-attribute.container';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {WaterAttributeContainer} from './water-attribute/water-attribute.container';
import {logic} from '../../../../../../game';
import {selectTerritoryById} from '../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetAttributesContainer extends Container implements OnReady, OnDestroy {
    public sunlightAttributeContainer: SunlightAttributeContainer;
    public waterAttributeContainer: WaterAttributeContainer;

    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('attributes');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.sunlightAttributeContainer = new SunlightAttributeContainer(this.planetState);
        this.addControlToContainer(this.sunlightAttributeContainer);

        this.waterAttributeContainer = new WaterAttributeContainer(this.planetState);
        this.waterAttributeContainer.control.left = '70px';
        this.addControlToContainer(this.waterAttributeContainer);
    }

    public gameOnReady(): void {
        this.subscription = logic().tourService.completeTour$.pipe(
            tap(() => {
                this.planetState = selectTerritoryById(this.planetState.id);
            })
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
