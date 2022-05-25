import * as GUI from 'babylonjs-gui';
import {PlanetState} from '../../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../../logic/store/territory/territory.state';
import {AttributeControl} from '../../../../shared/attribute/attribute.control';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {IconControl} from '../../../../shared/icon/icon.control';
import {TextControl} from '../../../../shared/text/text.control';

export class WaterAttributeControl extends Control {
    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }

    public render(): GUI.Control {
        return new AttributeControl(
            new IconControl('water-drop'),
            new TextControl(`Water ${this.planetState.data.water}%`)
        ).render();
    }
}
