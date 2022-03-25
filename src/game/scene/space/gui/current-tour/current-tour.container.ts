import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {CurrentTourControl} from './current-tour/current-tour.control';
import {NextTourControl} from './next-tour/next-tour.control';

export class CurrentTourContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('currentTourBar');
        this.container.width = '200px';
        this.container.height = '150px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

        this.container.addControl(new NextTourControl().render());
        this.container.addControl(new CurrentTourControl().render());

        return this.container;
    }
}
