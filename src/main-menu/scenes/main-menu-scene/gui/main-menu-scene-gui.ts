import {tap} from 'rxjs';
import {gameEngine} from '../../../../core/game-platform';
import {Gui} from '../../../../game/scene/gui';
import {MainMenuBeginBtn} from './menu-buttons/main-menu-begin-btn';
import {MainMenuLeaveBtn} from './menu-buttons/main-menu-leave-btn';
import {MainMenuLoadBtn} from './menu-buttons/main-menu-load-btn';
import {MainMenuOptionsBtn} from './menu-buttons/main-menu-options-btn';


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
        this.guiManager.render(this.mainMenuBeginBtn);
        this.guiManager.render(this.mainMenuLoadBtn);
        this.guiManager.render(this.mainMenuOptionsBtn);
        this.guiManager.render(this.mainMenuLeaveBtn);
    }
}
