import {CurrentTourGuiContainer} from '../../../gui-objects/current-tour/current-tour.gui-container';
import {FooterGuiContainer} from '../../../gui-objects/shared/footer/footer.gui-container';
import {GalaxyNameLabelGuiObject} from './galaxy-name-label/galaxy-name-label.gui-object';
import {GalaxyState} from '../../../engine/game-state/gameplay-state/galaxy-state/galaxy-state';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';
import {ToolbarGuiContainer} from '../../../gui-objects/shared/toolbar/toolbar.gui-container';

export class GalaxySceneGui extends SceneGui {
    constructor(private galaxyState: GalaxyState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarGuiContainer());
        this.guiManager.render(new FooterGuiContainer());

        this.guiManager.render(new GalaxyNameLabelGuiObject(this.galaxyState));
        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
