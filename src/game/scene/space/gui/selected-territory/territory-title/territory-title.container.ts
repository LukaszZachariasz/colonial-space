import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/container';
import {IconControl} from '../../shared/icon/icon.control';
import {TerritoryNameContainer} from './territory-name/territory-name.container';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class TerritoryTitleContainer extends Container {
    public iconControl: IconControl;
    public territoryNameControl: TerritoryNameContainer;

    constructor(private territoryState: TerritoryState) {
        super('title');
    }

    public onCreate(): void {
        super.onCreate();
        this.iconControl = new IconControl(this.territoryState.icon);
        this.territoryNameControl = new TerritoryNameContainer(this.territoryState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.iconControl);
        this.addControlToContainer(this.territoryNameControl);
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
