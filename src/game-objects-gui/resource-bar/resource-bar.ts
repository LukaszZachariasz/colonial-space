import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../game-object-gui';
import {WoodLabel} from './wood-label/wood-label';
import gameState from '../../game-core/game-state/game-state';
import guiManager from '../../engine/gui-manager/gui-manager';

export class ResourceBar implements GameObjectGui {
    public resourceBarContainer: GUI.Container;

    public create(): GUI.Control {
        this.resourceBarContainer = new GUI.Container('resourceBar');
        this.resourceBarContainer.width = '100px';
        this.resourceBarContainer.height = '50px';
        this.resourceBarContainer.top = '-60px';
        this.resourceBarContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.resourceBarContainer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        guiManager.create(new WoodLabel(gameState.gameplayState.resourceState), this.resourceBarContainer);

        return this.resourceBarContainer;
    }
}