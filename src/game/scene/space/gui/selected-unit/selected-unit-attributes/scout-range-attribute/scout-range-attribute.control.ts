import * as GUI from 'babylonjs-gui';
import {AttributeControl} from '../../../shared/attribute/attribute.control';
import {Control} from '../../../../../../../engine/gui-manager/control';
import {IconControl} from '../../../shared/icon/icon.control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

export class ScoutRangeAttributeControl extends Control {
    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        return new AttributeControl(
            new IconControl('binoculars'),
            new TextControl(`This unit has ${this.unitState.scoutRange} scout range.`)
        ).render();
    }
}
