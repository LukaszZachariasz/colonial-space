import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {GuiManagerService} from '../../../core/gui-manager/gui-manager.service';
import {GuiScene} from '../../../core/gui-manager/gui-scene/gui-scene';
import {Inject} from '@colonial-space/core/injector/inject';
import {TextGuiElement} from '../../game/scene/space/gui/shared/text/text.gui-element';

@GuiScene()
export class LoadingGui implements OnInit {
    @Inject(GuiManagerService) private guiManagerService: GuiManagerService;
    
    public gameOnInit(): void {
        this.guiManagerService.appendToRoot(new TextGuiElement('Loading...'));
    }
}
