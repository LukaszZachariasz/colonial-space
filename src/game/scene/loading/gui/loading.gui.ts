import {Gui} from '../../gui';
import {LoadingTextControl} from './loading-text/loading-text.control';

export class LoadingGui extends Gui {
    public render(): void {
        this.guiManager.render(new LoadingTextControl());
    }
}
