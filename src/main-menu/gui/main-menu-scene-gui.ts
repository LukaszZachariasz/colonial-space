import {AfterCreated} from '../../engine/lifecycle/after-created/after-created';
import {GuiScene} from '../../engine/gui-manager/gui-scene/gui-scene';
import {MainMenuBeginBtnControl} from './menu-buttons/main-menu-begin-btn.control';
import {MainMenuLeaveBtnControl} from './menu-buttons/main-menu-leave-btn.control';
import {MainMenuLoadBtnControl} from './menu-buttons/main-menu-load-btn.control';
import {MainMenuOptionsBtnControl} from './menu-buttons/main-menu-options-btn.control';
import {OnDestroy} from '../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../engine/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';
import {gameEngine} from '../../core/game-platform';
import {guiManager} from 'engine';

@GuiScene()
export class MainMenuSceneGui implements AfterCreated, OnReady, OnDestroy {
    private mainMenuBeginBtnControl = new MainMenuBeginBtnControl();
    private mainMenuLoadBtnControl = new MainMenuLoadBtnControl();
    private mainMenuOptionsBtnControl = new MainMenuOptionsBtnControl();
    private mainMenuLeaveBtnControl = new MainMenuLeaveBtnControl();

    private mainMenuBeginBtnClicked: Subscription;

    public gameAfterCreated(): void {
        guiManager().appendToRoot(this.mainMenuBeginBtnControl);
        guiManager().appendToRoot(this.mainMenuLoadBtnControl);
        guiManager().appendToRoot(this.mainMenuOptionsBtnControl);
        guiManager().appendToRoot(this.mainMenuLeaveBtnControl);
    }

    public gameOnReady(): void {
        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtnControl.onClick$.pipe(
            tap(() => gameEngine().newGame())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
