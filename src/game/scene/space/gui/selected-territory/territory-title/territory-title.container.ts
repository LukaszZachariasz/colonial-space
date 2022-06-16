import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../shared/icon/icon.control';
import {TerritoryNameContainer} from './territory-name/territory-name.container';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

@GuiElement()
export class TerritoryTitleContainer extends GuiContainer implements AfterCreated {
    public iconControl: IconControl;
    public territoryNameControl: TerritoryNameContainer;

    constructor(private territoryState: TerritoryState) {
        super('title');
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.iconControl = new IconControl(this.territoryState.icon);
        this.addControlToContainer(this.iconControl);

        this.territoryNameControl = new TerritoryNameContainer(this.territoryState);
        this.addControlToContainer(this.territoryNameControl);
    }
}
