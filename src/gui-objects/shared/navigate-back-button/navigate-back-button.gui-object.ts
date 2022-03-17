import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../gui-object';
import {sceneManager} from '../../../core/game-platform';

export class NavigateBackButtonGuiObject extends GuiObject {
    public button: GUI.Button;

    constructor(private text: string) {
        super();
    }

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('navigateBackButton', this.text);
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            sceneManager().navigateBack();
        });

        return this.button;
    }
}