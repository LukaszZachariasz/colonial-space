import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';

export class ButtonControl extends Control {
    public button: GUI.Button = GUI.Button.CreateSimpleButton(this.text, this.text);

    constructor(private text: string,
                private onClick: () => void) {
        super();
    }

    public render(): GUI.Control {
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.background = 'rgba(0, 0, 0, 0.3)';
        this.button.color = 'white';
        this.button.fontFamily = 'JuiceRegular';
        this.button.fontSize = '12px';

        this.button.onPointerClickObservable.add(this.onClick);

        return this.button;
    }
}
