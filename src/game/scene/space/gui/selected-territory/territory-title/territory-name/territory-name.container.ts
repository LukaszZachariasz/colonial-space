import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../shared/text/text.control';

@GuiElement()
export class TerritoryNameContainer extends GuiContainer implements AfterCreated {
    public text: TextControl;

    constructor(private territoryState: TerritoryState) {
        super('territoryName');
    }

    public gameAfterCreated(): void {
        this.text = new TextControl(this.territoryState.name);
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '60px';
        this.addControlToContainer(this.text);
    }
}
