import * as GUI from 'babylonjs-gui';
import {AbstractMenuBtn} from './abstract-menu-btn';

export class MainMenuOptionsBtn extends AbstractMenuBtn {
    private readonly BTN_NAME = 'MainMenuOptionsBtn';

    constructor() {
        super();
    }

    public render(): GUI.Control {
        this.create();
        this.registerChanges();

        return this.btn;
    }

    private create(): void {
        this.btn = GUI.Button.CreateImageOnlyButton(this.BTN_NAME, 'resources/gui/main-menu/buttons/mm-options-btn-idle.svg');

        this.btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.btn.paddingLeftInPixels = 20;
        this.btn.color = 'transparent';
        this.btn.heightInPixels = 60;
        this.btn.widthInPixels = 500;
        this.btn.leftInPixels = 40;
        this.btn.topInPixels = -130;
    }

    private registerChanges(): void {
        this.btn.onPointerEnterObservable.add(() => {
            this.btn.image.source = 'resources/gui/main-menu/buttons/mm-options-btn-hover.svg';
        });
        this.btn.onPointerOutObservable.add(() => {
            this.btn.image.source = 'resources/gui/main-menu/buttons/mm-options-btn-idle.svg';
        });
    }
}
