import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {OnDestroy} from '../../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetTotalProductionContainer extends GuiContainer implements AfterCreated, OnReady, OnDestroy {
    public textControl: TextControl;

    private endOfTourSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('planetTotalProduction');
    }

    public gameAfterCreated(): void {
        this.textControl = new TextControl('Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data));
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.addControlToContainer(this.textControl);
    }

    public gameOnReady(): void {
        this.endOfTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => this.textControl.control.text = 'Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data))
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.endOfTourSubscription?.unsubscribe();
    }
}
