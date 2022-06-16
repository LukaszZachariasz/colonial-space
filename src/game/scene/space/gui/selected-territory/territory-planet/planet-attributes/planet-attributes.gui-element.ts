import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {SunlightAttributeGuiElement} from './sunlight-attribute/sunlight-attribute.gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {WaterAttributeGuiElement} from './water-attribute/water-attribute.gui-element';
import {logic} from '../../../../../../game';
import {selectTerritoryById} from '../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetAttributesGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendGuiControl() public sunlightAttributeGuiElement: SunlightAttributeGuiElement = new SunlightAttributeGuiElement(this.planetState);
    @AppendGuiControl() public waterAttributeGuiElement: WaterAttributeGuiElement = new WaterAttributeGuiElement(this.planetState);

    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.waterAttributeGuiElement.control.left = '70px';
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
