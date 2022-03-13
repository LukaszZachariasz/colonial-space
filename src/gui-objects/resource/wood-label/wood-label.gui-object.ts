import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../gui-object';
import {ResourceState} from '../../../engine/game-state/gameplay-state/resource-state/resource-state';

export class WoodLabelGuiObject extends GuiObject {
    public text: GUI.TextBlock;

    constructor(private resourceState: ResourceState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('currentWood', 'Wood: 0');
        this.text.width = '100px';
        this.text.height = '16px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.scene.registerBeforeRender(() => {
            this.text.text = 'Wood: ' + this.resourceState.wood;
        });

        return this.text;
    }
}
