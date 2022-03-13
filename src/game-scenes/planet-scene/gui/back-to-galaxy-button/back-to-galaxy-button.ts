import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';
import {gamePlatform} from '../../../../core/game-platform';
import gameState from '../../../../game-core/game-state/game-state';

export class BackToGalaxyButton implements GameObjectGui {
    public button: GUI.Button;

    public create(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('galaxyView', 'Galaxy view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            gamePlatform().engine.sceneManager.navigateToScene(gameState.gameplayState.galaxyState.name);
        });

        return this.button;
    }
}
