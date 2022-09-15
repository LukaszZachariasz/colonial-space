import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {TextGuiElement} from '../../game/space-scene/gui/shared/text/text.gui-element';

export class LoadingGui implements OnLoad {
    @Inject(SceneGuiManager) private guiManagerService: SceneGuiManager;
    
    public gameOnLoad(): void {
        this.guiManagerService.appendToRoot(new TextGuiElement('Loading...'));
    }
}
