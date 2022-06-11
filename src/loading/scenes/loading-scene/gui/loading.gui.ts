import {Gui} from '../../../../engine/gui-manager/gui';
import {TextControl} from '../../../../game/scene/space/gui/shared/text/text.control';

export class LoadingGui extends Gui {
    public render(): void {
        this.guiManager.appendToRoot(new TextControl('Loading...'));
    }
}
