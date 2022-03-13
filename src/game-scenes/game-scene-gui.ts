import {gamePlatform} from '../core/game-platform';

export abstract class GameSceneGui {
    protected guiManager = gamePlatform().engine.guiManager;

    public abstract render(): void;
}
