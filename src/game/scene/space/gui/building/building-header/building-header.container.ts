import * as GUI from 'babylonjs-gui';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/container';
import {TextControl} from '../../shared/text/text.control';

export class BuildingHeaderContainer extends Container {
    public title: TextControl;

    constructor(private buildingState: BuildingState) {
        super('header');
    }

    public onCreate(): void {
        super.onCreate();
        this.title = new TextControl('Building', {uppercase: true});
    }

    public onBuild(): void {
        this.addControlToContainer(this.title);
    }

    public onApplyStyles(): void {
        this.control.height = '10%';
        this.control.width = '100%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.title.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
