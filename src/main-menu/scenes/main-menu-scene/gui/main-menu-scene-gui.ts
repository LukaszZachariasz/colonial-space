import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {MainMenuBeginBtnControl} from './menu-buttons/main-menu-begin-btn.control';
import {MainMenuLeaveBtnControl} from './menu-buttons/main-menu-leave-btn.control';
import {MainMenuLoadBtnControl} from './menu-buttons/main-menu-load-btn.control';
import {MainMenuOptionsBtnControl} from './menu-buttons/main-menu-options-btn.control';
import {Subscription, tap} from 'rxjs';
import {gameEngine} from '../../../../core/game-platform';
import {guiManager} from 'engine';

export class MainMenuSceneGui extends Gui {
    private mainMenuBeginBtnControl = new MainMenuBeginBtnControl();
    private mainMenuLoadBtnControl = new MainMenuLoadBtnControl();
    private mainMenuOptionsBtnControl = new MainMenuOptionsBtnControl();
    private mainMenuLeaveBtnControl = new MainMenuLeaveBtnControl();

    private mainMenuBeginBtnClicked: Subscription;

    constructor() {
        super();

        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtnControl.onClick$.pipe(
            tap(() => gameEngine().newGame())
        ).subscribe();
    }

    public onCreate(): void {
        guiManager().appendToRoot(this.mainMenuBeginBtnControl);
        guiManager().appendToRoot(this.mainMenuLoadBtnControl);
        guiManager().appendToRoot(this.mainMenuOptionsBtnControl);
        guiManager().appendToRoot(this.mainMenuLeaveBtnControl);
    }

    public onDestroy(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
