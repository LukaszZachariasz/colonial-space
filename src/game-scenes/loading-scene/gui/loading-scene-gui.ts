import {GameSceneGui} from '../../game-scene-gui';
import {LoadingText} from './loading-text/loading-text';

export class LoadingSceneGui extends GameSceneGui {
    public render(): void {
        this.guiManager.render(new LoadingText());
    }
}
