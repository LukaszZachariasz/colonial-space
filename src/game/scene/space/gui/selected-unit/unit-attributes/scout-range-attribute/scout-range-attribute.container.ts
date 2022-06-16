import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiContainer} from '../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../shared/icon/icon.control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class ScoutRangeAttributeContainer extends GuiContainer implements AfterCreated {
    public attributeControl: AttributeContainer;

    constructor(private unitState: UnitState) {
        super('scoutRangeAttribute');
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.attributeControl = new AttributeContainer(
            new IconControl(GameIcon.BINOCULARS),
            new TextControl(`This unit has ${this.unitState.scoutRange} scout range.`)
        );
        this.addControlToContainer(this.attributeControl);
    }
}
