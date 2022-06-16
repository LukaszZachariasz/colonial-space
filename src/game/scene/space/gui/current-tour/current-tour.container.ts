import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {CurrentTourControl} from './current-tour/current-tour.control';
import {GuiContainer} from '../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {NextTourControl} from './next-tour/next-tour.control';

@GuiElement()
export class CurrentTourContainer extends GuiContainer implements AfterCreated {
    public nextTourControl: NextTourControl;
    public currentTourControl: CurrentTourControl;

    constructor() {
        super('currentTourBar');
    }

    public gameAfterCreated(): void {
        this.control.width = '200px';
        this.control.height = '150px';
        this.control.top = '-60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

        this.nextTourControl = new NextTourControl();
        this.addControlToContainer(this.nextTourControl);

        this.currentTourControl = new CurrentTourControl();
        this.addControlToContainer(this.currentTourControl);
    }
}
