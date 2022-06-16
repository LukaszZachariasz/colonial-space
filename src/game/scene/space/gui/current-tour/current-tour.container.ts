import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {CurrentTourControl} from './current-tour/current-tour.control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {NextTourControl} from './next-tour/next-tour.control';

@GuiElement()
export class CurrentTourContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('currentTourBar');
    
    @AppendControl() public nextTourControl: NextTourControl = new NextTourControl();
    @AppendControl() public currentTourControl: CurrentTourControl = new CurrentTourControl();

    public gameAfterCreated(): void {
        this.control.width = '200px';
        this.control.height = '150px';
        this.control.top = '-60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
}
