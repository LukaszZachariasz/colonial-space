import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {MainMenuBeginBtn} from './menu-buttons/main-menu-begin-btn';
import {MainMenuLeaveBtn} from './menu-buttons/main-menu-leave-btn';
import {MainMenuLoadBtn} from './menu-buttons/main-menu-load-btn';
import {MainMenuOptionsBtn} from './menu-buttons/main-menu-options-btn';
import {Subscription, tap} from 'rxjs';
import {gameEngine} from '../../../../core/game-platform';
import {guiManager} from 'engine';

export class MainMenuSceneGui extends Gui {
    private mainMenuBeginBtn = new MainMenuBeginBtn();
    private mainMenuLoadBtn = new MainMenuLoadBtn();
    private mainMenuOptionsBtn = new MainMenuOptionsBtn();
    private mainMenuLeaveBtn = new MainMenuLeaveBtn();

    private mainMenuBeginBtnClicked: Subscription;

    constructor() {
        super();

        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtn.onClick$.pipe(
            tap(() => gameEngine().newGame())
        ).subscribe();
    }

    public onCreate(): void {
        guiManager().appendToRoot(this.mainMenuBeginBtn);
        guiManager().appendToRoot(this.mainMenuLoadBtn);
        guiManager().appendToRoot(this.mainMenuOptionsBtn);
        guiManager().appendToRoot(this.mainMenuLeaveBtn);
    }

    public onDestroy(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
