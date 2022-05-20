import {Gui} from '../../../../engine/gui-manager/gui';
import {TextControl} from '../../space/gui/shared/text/text.control';

export class LoadingGui extends Gui {
    public render(): void {
        this.guiManager.render(new TextControl('Loading...'));
    }
}
