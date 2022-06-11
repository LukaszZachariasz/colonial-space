import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {TextControl} from '../../../../game/scene/space/gui/shared/text/text.control';
import {guiManager} from 'engine';

export class LoadingGui extends Gui {
    public onCreate(): void {
        guiManager().appendToRoot(new TextControl('Loading...'));
    }
}
