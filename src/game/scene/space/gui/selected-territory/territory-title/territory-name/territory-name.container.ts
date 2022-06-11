import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../shared/text/text.control';

export class TerritoryNameContainer extends Container {
    public text: TextControl;

    constructor(private territoryState: TerritoryState) {
        super('territoryName');
    }

    public onCreate(): void {
        super.onCreate();
        this.text = new TextControl(this.territoryState.name);
    }

    public onBuild(): void {
        this.addControlToContainer(this.text);
    }

    public onApplyStyles(): void {
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '60px';
    }
}
