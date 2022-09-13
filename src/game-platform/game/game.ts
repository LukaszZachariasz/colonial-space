import {Container} from 'typedi';
import {GameBuilder} from './game-builder/game-builder';
import {LoadingManager} from '../core/loading-manager/loading-manager';
import {Logic} from './logic/logic';
import {WelcomeGuiElement} from './scene/space/gui/dialogs/welcome/welcome.gui-element';
import {filter, take, tap} from 'rxjs';
import {game, sceneManager} from 'engine';

export class Game {
    public logic: Logic;
    
    public gameBuilder: GameBuilder = new GameBuilder();
    
    public generate(): void {
        sceneManager().navigateToScene('LoadingScene');
        this.logic = new Logic();
        this.logic.storeGenerator.generate();
    }

    public start(): void {
        this.gameBuilder.build();

        Container.get(LoadingManager).isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneManager().navigateToScene('SpaceScene')),
            tap(() => logic().dialogService.open$.next(new WelcomeGuiElement()))
        ).subscribe();
    }
}

export const logic = (): Logic => game().logic;
