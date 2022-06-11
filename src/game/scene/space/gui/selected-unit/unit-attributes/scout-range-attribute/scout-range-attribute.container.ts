import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {IconControl} from '../../../shared/icon/icon.control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

export class ScoutRangeAttributeContainer extends Container {
    public attributeControl: AttributeContainer;

    constructor(private unitState: UnitState) {
        super('scoutRangeAttribute');
    }

    public onCreate(): void {
        super.onCreate();
        this.attributeControl = new AttributeContainer(
            new IconControl(GameIcon.BINOCULARS),
            new TextControl(`This unit has ${this.unitState.scoutRange} scout range.`)
        );
    }

    public onBuild(): void {
        this.addControlToContainer(this.attributeControl);
    }
}
