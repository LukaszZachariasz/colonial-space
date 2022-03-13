import * as GUI from 'babylonjs-gui';
import {GalaxyState} from '../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-state';
import {GuiObject} from '../../../../gui-objects/gui-object';

export class GalaxyNameLabel extends GuiObject {
    public text: GUI.TextBlock;

    constructor(private galaxyState: GalaxyState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('galaxyNameLabel', this.galaxyState.name);
        this.text.color = 'white';
        this.text.resizeToFit = true;
        this.text.top = '20px';
        this.text.left = '10px';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        return this.text;
    }
}
