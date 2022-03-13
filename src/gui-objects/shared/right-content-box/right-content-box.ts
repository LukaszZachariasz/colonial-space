import * as GUI from 'babylonjs-gui';
import {take, tap} from 'rxjs';
import {Closable} from '../../closable';
import {GuiContainer} from '../../gui-container';
import {CloseButton} from '../close-button/close-button';

export class RightContentBox extends GuiContainer implements Closable {
    public container: GUI.Container;
    public closeButton: CloseButton;

    public render(): GUI.Control {
        this.container = new GUI.Container('rightContentBox');
        this.container.width = '300px';
        this.container.height = '100%';
        this.container.background = 'rgb(45,45,45)';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.closeButton = new CloseButton();
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
