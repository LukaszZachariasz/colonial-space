import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../../engine/gui-manager/control';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../shared/text/text.control';

export class TerritoryNameControl extends Control {
    public text: TextControl;

    constructor(private territoryState: TerritoryState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new TextControl(this.territoryState.name);
        this.text.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.textBlock.left = '60px';

        return this.text.render();
    }
}
