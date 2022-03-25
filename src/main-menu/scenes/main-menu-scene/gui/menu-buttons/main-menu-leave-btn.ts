import * as GUI from 'babylonjs-gui';
import {AbstractMenuBtn} from './abstract-menu-btn';

export class MainMenuLeaveBtn extends AbstractMenuBtn {
    private readonly BTN_NAME = 'MainMenuLeaveBtn';

    constructor() {
        super();
    }

    public generateButton(): void {
        this.btn = GUI.Button.CreateImageOnlyButton(this.BTN_NAME, 'resources/gui/main-menu/buttons/mm-leave-btn-idle.svg');

        this.btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.btn.paddingLeftInPixels = 20;
        this.btn.color = 'transparent';
        this.btn.heightInPixels = 60;
        this.btn.widthInPixels = 500;
        this.btn.leftInPixels = 40;
        this.btn.topInPixels = -50;

        this.btn.onPointerEnterObservable.add(() => {
            this.btn.image.source = 'resources/gui/main-menu/buttons/mm-leave-btn-hover.svg';
        });

        this.btn.onPointerOutObservable.add(() => {
            this.btn.image.source = 'resources/gui/main-menu/buttons/mm-leave-btn-idle.svg';
        });
    }

    public render(): GUI.Control {
        return this.btn;
    }
}
