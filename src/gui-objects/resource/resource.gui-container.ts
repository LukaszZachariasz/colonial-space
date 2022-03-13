import * as GUI from 'babylonjs-gui';
import {gameplayState} from '../../core/game-platform';
import {GuiContainer} from '../gui-container';
import {WoodLabelGuiObject} from './wood-label/wood-label.gui-object';

export class ResourceGuiContainer extends GuiContainer {
    public container: GUI.Container;

    public render(): GUI.Control {
        this.container = new GUI.Container('resourceBar');
        this.container.width = '100px';
        this.container.height = '50px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.addControl(new WoodLabelGuiObject(gameplayState().resourceState).render());

        return this.container;
    }
}
