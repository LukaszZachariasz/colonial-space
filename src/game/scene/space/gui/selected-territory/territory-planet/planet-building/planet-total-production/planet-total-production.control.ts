import * as GUI from 'babylonjs-gui';
import {Subscription, tap} from 'rxjs';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {selectTerritoryById} from '../../../../../../../logic/store/territory/territory.selectors';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';

export class PlanetTotalProductionControl extends Control {
    public textControl: TextControl = new TextControl('Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data));

    private endOfTourSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.textControl.render();
        this.textControl.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.endOfTourSubscription = logic().tourService.completeTour$.pipe(
            tap(() => this.planetState = selectTerritoryById(this.planetState.id)),
            tap(() => this.textControl.textBlock.text = 'Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data))
        ).subscribe();

        this.textControl.textBlock.onDisposeObservable.add(() => {
            this.endOfTourSubscription?.unsubscribe();
        });

        return this.textControl.textBlock;
    }
}
