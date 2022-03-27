import * as GUI from 'babylonjs-gui';
import {AwarenessControl} from './awareness/awareness.control';
import {Container} from '../../../../../engine/gui-manager/container';
import {FuelControl} from './fuel/fuel.control';
import {ScienceControl} from './science/science.control';

export class GlobalResourceContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('globalResource');
        this.container.width = '50%';
        this.container.height = '100%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.addControl(new AwarenessControl().render());
        this.container.addControl(new FuelControl().render());
        this.container.addControl(new ScienceControl().render());

        return this.container;
    }
}
