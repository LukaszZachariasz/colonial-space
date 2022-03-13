import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../gui-object';
import {Subject} from 'rxjs';

export class CloseButton extends GuiObject {
    public closeButton: GUI.Button;
    public clicked$ = new Subject<void>();

    public render(): GUI.Control {
        this.closeButton = GUI.Button.CreateSimpleButton('rightContentBoxCloseButton', 'X');
        this.closeButton.width = '50px';
        this.closeButton.height = '50px';
        this.closeButton.color = 'white';
        this.closeButton.top = '5px';
        this.closeButton.left = '5px';
        this.closeButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.closeButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.closeButton.onPointerUpObservable.addOnce(() => {
            this.clicked$.next();
        });

        return this.closeButton;
    }
}
