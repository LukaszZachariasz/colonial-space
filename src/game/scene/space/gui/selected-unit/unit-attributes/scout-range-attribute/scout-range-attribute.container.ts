import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../shared/icon/icon.control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class ScoutRangeAttributeContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('scoutRangeAttribute');
    
    @AppendControl() public attributeControl: AttributeContainer = new AttributeContainer(
        new IconControl(GameIcon.BINOCULARS),
        new TextControl(`This unit has ${this.unitState.scoutRange} scout range.`)
    );

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
