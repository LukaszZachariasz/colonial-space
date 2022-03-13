import {gamePlatform} from '../core/game-platform';

export abstract class SceneGui {
    protected guiManager = gamePlatform().engine.guiManager;

    public abstract render(): void;
}