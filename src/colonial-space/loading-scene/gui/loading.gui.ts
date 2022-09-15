import {GuiManager} from '@colonial-space/core/gui-manager/gui-manager';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {TextGuiElement} from '../../game/space-scene/gui/shared/text/text.gui-element';

export class LoadingGui implements OnLoad {
    @Inject(GuiManager) private guiManagerService: GuiManager;
    
    public gameOnLoad(): void {
        this.guiManagerService.appendToRoot(new TextGuiElement('Loading...'));
    }
}
