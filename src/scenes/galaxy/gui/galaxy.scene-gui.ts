import {CurrentTourBarGuiContainer} from '../../../gui-objects/current-tour/current-tour-bar.gui-container';
import {GalaxyNameLabelGuiObject} from './galaxy-name-label/galaxy-name-label.gui-object';
import {GalaxyState} from '../../../engine/game-state/gameplay-state/galaxy-state/galaxy-state';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class GalaxySceneGui extends SceneGui {
    constructor(private galaxyState: GalaxyState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new GalaxyNameLabelGuiObject(this.galaxyState));
        this.guiManager.render(new CurrentTourBarGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
