import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {IconControl} from '../../shared/icon/icon.control';
import {TerritoryNameControl} from './territory-name/territory-name.control';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class TerritoryTitleContainer extends Container {
    constructor(private territoryState: TerritoryState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('title');
        this.container.width = '100%';
        this.container.height = '50px';
        this.container.left = '10px';
        this.container.top = '10px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.addControl(new IconControl('planet').render());
        this.container.addControl(new TerritoryNameControl(this.territoryState).render());

        return this.container;
    }
}
