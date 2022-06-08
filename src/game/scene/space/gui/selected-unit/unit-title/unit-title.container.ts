import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {GameIcon} from '../../shared/icon/game-icon';
import {IconControl} from '../../shared/icon/icon.control';
import {UnitNameControl} from './unit-name/unit-name.control';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class UnitTitleContainer extends Container {
    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('title');
        this.container.width = '100%';
        this.container.height = '50px';
        this.container.left = '10px';
        this.container.top = '10px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.addControl(new IconControl(GameIcon.SPYGLASS).render());
        this.container.addControl(new UnitNameControl(this.unitState).render());

        return this.container;
    }
}
