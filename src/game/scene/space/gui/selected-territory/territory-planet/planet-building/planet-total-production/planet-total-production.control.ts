import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';

export class PlanetTotalProductionControl extends Control {
    public textControl: TextControl = new TextControl('Production: ' + logic().planetProductionService.getTotalProduction(this.planetState.data));

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.textControl.render();
        this.textControl.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        return this.textControl.textBlock;
    }
}