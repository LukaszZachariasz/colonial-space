import {LoadingTextGuiObject} from './loading-text/loading-text.gui-object';
import {SceneGui} from '../../scene-gui';

export class LoadingSceneGui extends SceneGui {
    public render(): void {
        this.guiManager.render(new LoadingTextGuiObject());
    }
}
