import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {MainMenuBeginBtn} from './menu-buttons/main-menu-begin-btn';
import {MainMenuLeaveBtn} from './menu-buttons/main-menu-leave-btn';
import {MainMenuLoadBtn} from './menu-buttons/main-menu-load-btn';
import {MainMenuOptionsBtn} from './menu-buttons/main-menu-options-btn';
import {gameEngine} from '../../../../core/game-platform';
import {tap} from 'rxjs';

export class MainMenuSceneGui extends Gui {
    private mainMenuBeginBtn = new MainMenuBeginBtn();
    private mainMenuLoadBtn = new MainMenuLoadBtn();
    private mainMenuOptionsBtn = new MainMenuOptionsBtn();
    private mainMenuLeaveBtn = new MainMenuLeaveBtn();

    constructor() {
        super();

        this.mainMenuBeginBtn.onClick$.pipe(
            tap(() => gameEngine().newGame())
        ).subscribe();
    }

    public render(): void {
        this.guiManager.appendToRoot(this.mainMenuBeginBtn);
        this.guiManager.appendToRoot(this.mainMenuLoadBtn);
        this.guiManager.appendToRoot(this.mainMenuOptionsBtn);
        this.guiManager.appendToRoot(this.mainMenuLeaveBtn);
    }
}
