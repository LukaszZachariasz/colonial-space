import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../shared/icon/icon.gui-element';
import {TerritoryNameGuiElement} from './territory-name/territory-name.gui-element';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

@GuiElement()
export class TerritoryTitleGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('title');
    
    @AppendGuiControl() public iconControl: IconGuiElement = new IconGuiElement(this.territoryState.icon);
    @AppendGuiControl() public territoryNameGuiElement: TerritoryNameGuiElement = new TerritoryNameGuiElement(this.territoryState);

    constructor(private territoryState: TerritoryState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
