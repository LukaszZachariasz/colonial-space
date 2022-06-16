import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../shared/text/text.gui-element';

@GuiElement()
export class BuildingHeaderGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('header');
    
    @AppendGuiControl() public title: TextGuiElement = new TextGuiElement('Building', {uppercase: true});

    constructor(private buildingState: BuildingState) {
    }

    public gameAfterCreated(): void {
        this.control.height = '10%';
        this.control.width = '100%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.title.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
