import {CurrentTourGuiContainer} from './current-tour/current-tour.gui-container';
import {MinimapGuiContainer} from './minimap/minimap.gui-container';
import {SceneGui} from '../../scene-gui';
import {ToolbarGuiContainer} from './toolbar/toolbar.gui-container';

export class SpaceSceneGui extends SceneGui {
    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarGuiContainer());

        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new MinimapGuiContainer());
    }
}
