import {LoadingTextGuiObject} from './loading-text/loading-text.gui-object';
import {Gui} from '../../gui';

export class LoadingSceneGui extends Gui {
    public render(): void {
        this.guiManager.render(new LoadingTextGuiObject());
    }
}
