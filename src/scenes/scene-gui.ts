import {guiManager} from '../core/game-platform';

export abstract class SceneGui {
    protected guiManager = guiManager();

    public abstract render(): void;
}
