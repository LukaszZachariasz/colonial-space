import * as GUI from 'babylonjs-gui';
import {Closable} from '../../closable';
import {CloseButtonGuiObject} from '../close-button/close-button.gui-object';
import {GuiContainer} from '../../gui-container';
import {take, tap} from 'rxjs';

export class RightContentBoxGuiContainer extends GuiContainer implements Closable {
    public container: GUI.Container;
    public closeButton: CloseButtonGuiObject;

    public render(): GUI.Control {
        this.container = new GUI.Container('rightContentBox');
        this.container.width = '300px';
        this.container.height = '100%';
        this.container.background = 'rgb(45,45,45)';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.closeButton = new CloseButtonGuiObject();
        this.container.addControl(this.closeButton.render());

        this.closeButton.clicked$.pipe(
            take(1),
            tap(() => this.close())
        ).subscribe();

        return this.container;
    }

    public close(): void {
        this.container.dispose();
    }
}
