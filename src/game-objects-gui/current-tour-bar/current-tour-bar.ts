import * as GUI from 'babylonjs-gui';
import {CurrentTourLabel} from './current-tour-label/current-tour-label';
import {GameObjectGui} from '../game-object-gui';
import {NextTourButton} from './next-tour-button/next-tour-button';
import {gamePlatform} from '../../core/game-platform';
import gameState from '../../game-core/game-state/game-state';

export class CurrentTourBar implements GameObjectGui {
    public container: GUI.Container;

    public create(): GUI.Control {
        this.container = new GUI.Container('currentTourBar');
        this.container.width = '200px';
        this.container.height = '150px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        gamePlatform().engine.guiManager.render(new NextTourButton(gameState.tourManager), this.container);
        gamePlatform().engine.guiManager.render(new CurrentTourLabel(gameState.gameplayState), this.container);

        return this.container;
    }
}
