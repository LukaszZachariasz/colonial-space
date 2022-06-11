import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../../engine/gui-manager/gui-elements/container';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';

export class PlanetTotalProductionContainer extends Container {
    public textControl: TextControl;

    private endOfTourSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('planetTotalProduction');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl('Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data));
    }

    public onBuild(): void {
        this.addControlToContainer(this.textControl);
    }

    public onRegisterListeners(): void {
        this.endOfTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => this.textControl.control.text = 'Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data))
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }

    public onDestroy(): void {
        this.endOfTourSubscription?.unsubscribe();
    }
}
