import * as GUI from 'babylonjs-gui';
import {GameObjectGuiClosable} from '../game-object-gui-closable';
import {GameObjectGuiContainer} from '../game-object-gui-container';

export class RightContentBox implements GameObjectGuiContainer, GameObjectGuiClosable {
    public container: GUI.Container;
    public closeButton: GUI.Button;

    public create(): void {
        this.container = new GUI.Container('rightContentBox');
        this.container.width = '300px';
        this.container.height = '100%';
        this.container.background = 'rgb(45,45,45)';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.createCloseButton();
        this.container.addControl(this.closeButton);
    }

    public dispose(): void {
        this.container.dispose();
    }

    private createCloseButton(): void {
        this.closeButton = GUI.Button.CreateSimpleButton('rightContentBoxCloseButton', 'X');
        this.closeButton.width = '50px';
        this.closeButton.height = '50px';
        this.closeButton.color = 'white';
        this.closeButton.top = '5px';
        this.closeButton.left = '5px';
        this.closeButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.closeButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.closeButton.onPointerUpObservable.addOnce(() => {
            this.dispose();
        });
    }
}