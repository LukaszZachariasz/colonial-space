import {AfterCreated} from '../../../core/lifecycle/after-created/after-created';
import {GuiManagerService} from '../../core/gui-manager/gui-manager.service';
import {GuiScene} from '../../core/gui-manager/gui-scene/gui-scene';
import {Inject} from '@colonial-space/core/injector/inject';
import {TextGuiElement} from '../../game/scene/space/gui/shared/text/text.gui-element';

@GuiScene()
export class LoadingGui implements AfterCreated {
    @Inject(GuiManagerService) private guiManagerService: GuiManagerService;
    
    public gameAfterCreated(): void {
        this.guiManagerService.appendToRoot(new TextGuiElement('Loading...'));
    }
}
