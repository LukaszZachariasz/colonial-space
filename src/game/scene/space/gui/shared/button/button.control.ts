import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/control';

export class ButtonControl extends Control<GUI.Button> {
    constructor(private text: string,
                private onClick: () => void) {
        super();
    }

    public onCreate(): void {
        this.control = GUI.Button.CreateSimpleButton(this.text, this.text);
    }

    public onRegisterListeners(): void {
        this.control.onPointerClickObservable.add(this.onClick);
    }

    public onApplyStyles(): void {
        this.control.width = '100px';
        this.control.height = '50px';
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.color = 'white';
        this.control.fontFamily = 'JuiceRegular';
        this.control.fontSize = '12px';
    }
}
