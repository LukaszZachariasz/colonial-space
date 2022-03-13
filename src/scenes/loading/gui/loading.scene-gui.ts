import {SceneGui} from '../../scene-gui';
import {LoadingTextGuiObject} from './loading-text/loading-text.gui-object';

export class LoadingSceneGui extends SceneGui {
    public render(): void {
        this.guiManager.render(new LoadingTextGuiObject());
    }
}
