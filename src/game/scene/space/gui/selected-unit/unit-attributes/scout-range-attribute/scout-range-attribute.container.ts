import * as GUI from 'babylonjs-gui';
import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../shared/icon/icon.control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class ScoutRangeAttributeContainer extends Container {
    public attributeControl: AttributeContainer;

    constructor(private unitState: UnitState) {
        super('scoutRangeAttribute');
    }

    public onCreate(): void {
        super.onCreate();
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
