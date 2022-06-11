import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {CurrentTourControl} from './current-tour/current-tour.control';
import {NextTourControl} from './next-tour/next-tour.control';

export class CurrentTourContainer extends Container {
    public nextTourControl: NextTourControl;
    public currentTourControl: CurrentTourControl;

    constructor() {
        super('currentTourBar');
    }

    public onCreate(): void {
        super.onCreate();
        this.nextTourControl = new NextTourControl();
        this.currentTourControl = new CurrentTourControl();
    }

    public onBuild(): void {
        this.addControlToContainer(this.nextTourControl);
        this.addControlToContainer(this.currentTourControl);
    }

    public onApplyStyles(): void {
        this.control.width = '200px';
        this.control.height = '150px';
        this.control.top = '-60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
}
