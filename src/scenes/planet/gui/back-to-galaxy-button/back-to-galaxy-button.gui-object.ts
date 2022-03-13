import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../gui-objects/gui-object';
import {gamePlatform, gameplayState, gameState, sceneManager} from '../../../../core/game-platform';

export class BackToGalaxyButtonGuiObject extends GuiObject {
    public button: GUI.Button;

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('galaxyView', 'Galaxy view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            sceneManager().navigateToScene(gameplayState().galaxyState.name);
        });

        return this.button;
    }
}
