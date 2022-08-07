import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {PollutionAttributeGuiElement} from './pollution-attribute/pollution-attribute.gui-element';
import {SunlightAttributeGuiElement} from './sunlight-attribute/sunlight-attribute.gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {WaterAttributeGuiElement} from './water-attribute/water-attribute.gui-element';
import {logic} from '../../../../../../game';
import {selectTerritoryById} from '../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetAttributesGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendGuiControl() public sunlightAttribute: SunlightAttributeGuiElement = new SunlightAttributeGuiElement(this.planetState);
    @AppendGuiControl() public waterAttribute: WaterAttributeGuiElement = new WaterAttributeGuiElement(this.planetState);
    @AppendGuiControl() public pollutionAttribute: PollutionAttributeGuiElement = new PollutionAttributeGuiElement(this.planetState);

    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.waterAttribute.control.left = '70px';
        this.pollutionAttribute.control.left = '140px';
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
