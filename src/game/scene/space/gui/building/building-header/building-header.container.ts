import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../shared/text/text.control';

@GuiElement()
export class BuildingHeaderContainer extends GuiContainer implements AfterCreated {
    public title: TextControl;

    constructor(private buildingState: BuildingState) {
        super('header');
    }

    public gameAfterCreated(): void {
        this.control.height = '10%';
        this.control.width = '100%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.title = new TextControl('Building', {uppercase: true});
        this.title.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.addControlToContainer(this.title);
    }
}
