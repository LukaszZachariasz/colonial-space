import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {TextGuiElement} from '../../../../game/scene/space/gui/shared/text/text.gui-element';
import {guiManager} from 'engine';

export class LoadingGui extends Gui {
    public onCreate(): void {
        guiManager().appendToRoot(new TextGuiElement('Loading...'));
    }
}
