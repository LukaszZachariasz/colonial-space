import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {ColonialSpace} from '../../../colonial-space';
import {Container} from 'typedi';
import {GuiManagerService} from '../../../core/gui-manager/gui-manager.service';
import {GuiScene} from '../../../core/gui-manager/gui-scene/gui-scene';
import {Inject} from '@colonial-space/core/injector/inject';
import {MainMenuBeginBtnControl} from './menu-buttons/main-menu-begin-btn.control';
import {MainMenuLeaveBtnControl} from './menu-buttons/main-menu-leave-btn.control';
import {MainMenuLoadBtnControl} from './menu-buttons/main-menu-load-btn.control';
import {MainMenuOptionsBtnControl} from './menu-buttons/main-menu-options-btn.control';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {Subscription, tap} from 'rxjs';

@GuiScene()
export class MainMenuSceneGui implements OnInit, OnReady, OnDestroy {
    private mainMenuBeginBtnControl = new MainMenuBeginBtnControl();
    private mainMenuLoadBtnControl = new MainMenuLoadBtnControl();
    private mainMenuOptionsBtnControl = new MainMenuOptionsBtnControl();
    private mainMenuLeaveBtnControl = new MainMenuLeaveBtnControl();

    private mainMenuBeginBtnClicked: Subscription;

    @Inject(GuiManagerService) private guiManagerService: GuiManagerService;

    public gameOnInit(): void {
        this.guiManagerService.appendToRoot(this.mainMenuBeginBtnControl);
        this.guiManagerService.appendToRoot(this.mainMenuLoadBtnControl);
        this.guiManagerService.appendToRoot(this.mainMenuOptionsBtnControl);
        this.guiManagerService.appendToRoot(this.mainMenuLeaveBtnControl);
    }

    public gameOnReady(): void {
        this.mainMenuBeginBtnClicked = this.mainMenuBeginBtnControl.onClick$.pipe(
            tap(() => Container.get(ColonialSpace).newGame())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.mainMenuBeginBtnClicked?.unsubscribe();
    }
}
