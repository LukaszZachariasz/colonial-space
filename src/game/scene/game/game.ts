import {Container, Service} from 'typedi';
import {DialogService} from './logic/services/dialog/dialog.service';
import {GameBuilderService} from './game-builder/game-builder.service';
import {LoadingManagerService} from '../../core/loading-manager/loading-manager.service';
import {SceneManagerService} from '../../core/scene-manager/scene-manager.service';
import {StoreGenerator} from './logic/store-generator/store.generator';
import {WelcomeGuiElement} from './scene/space/gui/dialogs/welcome/welcome.gui-element';
import {filter, take, tap} from 'rxjs';

@Service()
export class Game {
    constructor(private sceneManagerService: SceneManagerService,
                private storeGenerator: StoreGenerator,
                private gameBuilder: GameBuilderService,
                private dialogService: DialogService) {
    }
    
    public generate(): void {
        this.sceneManagerService.navigateToScene('LoadingScene');
        this.storeGenerator.generate();
    }

    public start(): void {
        this.gameBuilder.build();

        Container.get(LoadingManagerService).isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => this.sceneManagerService.navigateToScene('SpaceScene')),
            tap(() => this.dialogService.open$.next(new WelcomeGuiElement()))
        ).subscribe();
    }
}
