import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../gui-objects/gui-object';
import {
    PlanetState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {gamePlatform} from '../../../../core/game-platform';

export class BackToPlanetButtonGuiObject extends GuiObject {
    public button: GUI.Button;

    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('planetView', 'Planet view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            gamePlatform().engine.sceneManager.navigateToScene(this.planetState.name);
        });

        return this.button;
    }
}
