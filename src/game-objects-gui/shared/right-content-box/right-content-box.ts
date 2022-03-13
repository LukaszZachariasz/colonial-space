import * as GUI from 'babylonjs-gui';
import {CloseButton} from '../close-button/close-button';
import {GameObjectGui} from '../../game-object-gui';
import {GameObjectGuiClosable} from '../../game-object-gui-closable';
import {gamePlatform} from '../../../core/game-platform';
import {take, tap} from 'rxjs';

export class RightContentBox implements GameObjectGui, GameObjectGuiClosable {
    public container: GUI.Container;
    public closeButton: CloseButton;

    public create(): GUI.Control {
        this.container = new GUI.Container('rightContentBox');
        this.container.width = '300px';
        this.container.height = '100%';
        this.container.background = 'rgb(45,45,45)';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.closeButton = gamePlatform().engine.guiManager.render(new CloseButton(), this.container);
        this.closeButton.clicked$.pipe(
            take(1),
            tap(() => this.dispose())
        ).subscribe();

        return this.container;
    }

    public dispose(): void {
        this.container.dispose();
    }
}
