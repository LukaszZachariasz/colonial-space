import * as GUI from 'babylonjs-gui';
import {AbstractMenuBtn} from './abstract-menu-btn';

export class MainMenuOptionsBtn extends AbstractMenuBtn {
    private readonly BTN_NAME = 'MainMenuOptionsBtn';

    constructor() {
        super();
    }

    public onCreate(): void {
        this.control = GUI.Button.CreateImageOnlyButton(this.BTN_NAME, 'resources/gui/main-menu/buttons/mm-options-btn-idle.svg');
    }

    public onApplyStyles(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.paddingLeftInPixels = 20;
        this.control.color = 'transparent';
        this.control.heightInPixels = 60;
        this.control.widthInPixels = 500;
        this.control.leftInPixels = 40;
        this.control.topInPixels = -130;
    }

    public onRegisterListeners(): void {
        this.control.onPointerClickObservable.add(() => this.onClick$.next());

        this.control.onPointerEnterObservable.add(() => {
            this.control.image.source = 'resources/gui/main-menu/buttons/mm-options-btn-hover.svg';
        });
        this.control.onPointerOutObservable.add(() => {
            this.control.image.source = 'resources/gui/main-menu/buttons/mm-options-btn-idle.svg';
        });
    }
}
