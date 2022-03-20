import {Gui} from '../../gui';
import {LoadingTextGuiObject} from './loading-text/loading-text.gui-object';

export class LoadingSceneGui extends Gui {
    public render(): void {
        this.guiManager.render(new LoadingTextGuiObject());
    }
}
