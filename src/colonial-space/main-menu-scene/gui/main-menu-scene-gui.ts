import {GameService} from '../../game/game.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {MainMenuBeginBtnGuiComponent} from './menu-buttons/main-menu-begin-btn.gui-component';
import {MainMenuLeaveBtnGuiComponent} from './menu-buttons/main-menu-leave-btn.gui-component';
import {MainMenuLoadBtnGuiComponent} from './menu-buttons/main-menu-load-btn.gui-component';
import {MainMenuOptionsBtnGuiComponent} from './menu-buttons/main-menu-options-btn.gui-component';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SceneGuiManager} from '@colonial-space/core/module/scene/gui/scene-gui-manager';
import {Subscription, tap} from 'rxjs';

export class MainMenuSceneGui implements OnLoad, OnUnload {
    @Inject(SceneGuiManager) private guiManager: SceneGuiManager;
    @Inject(GameService) private gameService: GameService;

    private mainMenuBeginBtnGuiComponent = new MainMenuBeginBtnGuiComponent();
    private mainMenuLoadBtnGuiComponent = new MainMenuLoadBtnGuiComponent();
    private mainMenuOptionsBtnGuiComponent = new MainMenuOptionsBtnGuiComponent();
    private mainMenuLeaveBtnGuiComponent = new MainMenuLeaveBtnGuiComponent();

    private mainMenuBeginBtnClicked: Subscription;

    public gameOnLoad(): void {
        this.guiManager.appendToRoot(this.mainMenuBeginBtnGuiComponent);
        this.guiManager.appendToRoot(this.mainMenuLoadBtnGuiComponent);
        this.guiManager.appendToRoot(this.mainMenuOptionsBtnGuiComponent);
        this.guiManager.appendToRoot(this.mainMenuLeaveBtnGuiComponent);

        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtnGuiComponent.onClick$.pipe(
            tap(() => this.gameService.newGame())
        ).subscribe();
    }

    public gameOnUnload(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
