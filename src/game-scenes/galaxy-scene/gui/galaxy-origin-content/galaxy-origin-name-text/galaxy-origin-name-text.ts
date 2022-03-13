import * as GUI from 'babylonjs-gui';
import {
    GalaxyOriginState
} from '../../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GuiObject} from '../../../../../gui-objects/gui-object';

export class GalaxyOriginNameText extends GuiObject {
    public text: GUI.TextBlock;

    constructor(private galaxyOriginState: GalaxyOriginState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('galaxyOriginName', this.galaxyOriginState.name);
        this.text.color = 'white';
        this.text.resizeToFit = true;
        this.text.top = '20px';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

        return this.text;
    }
}
