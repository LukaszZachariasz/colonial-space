import {GuiManager} from '@colonial-space/core/gui-manager/gui-manager';
import {Inject} from '@colonial-space/core/injector/inject';
import {MainMenuBeginBtnControl} from './menu-buttons/main-menu-begin-btn.control';
import {MainMenuLeaveBtnControl} from './menu-buttons/main-menu-leave-btn.control';
import {MainMenuLoadBtnControl} from './menu-buttons/main-menu-load-btn.control';
import {MainMenuOptionsBtnControl} from './menu-buttons/main-menu-options-btn.control';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {Subscription} from 'rxjs';

export class MainMenuSceneGui implements OnLoad, OnUnload {
    private mainMenuBeginBtnControl = new MainMenuBeginBtnControl();
    private mainMenuLoadBtnControl = new MainMenuLoadBtnControl();
    private mainMenuOptionsBtnControl = new MainMenuOptionsBtnControl();
    private mainMenuLeaveBtnControl = new MainMenuLeaveBtnControl();

    private mainMenuBeginBtnClicked: Subscription;

    @Inject(GuiManager) private guiManager: GuiManager;

    public gameOnLoad(): void {
        this.guiManager.appendToRoot(this.mainMenuBeginBtnControl);
        this.guiManager.appendToRoot(this.mainMenuLoadBtnControl);
        this.guiManager.appendToRoot(this.mainMenuOptionsBtnControl);
        this.guiManager.appendToRoot(this.mainMenuLeaveBtnControl);

        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtnControl.onClick$.pipe(
/*            tap(() => Container.get(ColonialSpace).newGame())*/
        ).subscribe();
    }

    public gameOnUnload(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
