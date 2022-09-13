import {AfterCreated} from '../../engine/lifecycle/after-created/after-created';
import {GuiScene} from '../../engine/gui-manager/gui-scene/gui-scene';
import {TextGuiElement} from '../../game/scene/space/gui/shared/text/text.gui-element';
import {guiManager} from 'engine';

@GuiScene()
export class LoadingGui implements AfterCreated {
    public gameAfterCreated(): void {
        guiManager().appendToRoot(new TextGuiElement('Loading...'));
    }
}
