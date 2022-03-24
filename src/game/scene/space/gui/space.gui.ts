import {CurrentTourContainer} from './current-tour/current-tour.container';
import {Gui} from '../../gui';
import {MinimapContainer} from './minimap/minimap.container';
import {ToolbarContainer} from './toolbar/toolbar.container';

export class SpaceGui extends Gui {
    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarContainer());
        this.guiManager.render(new CurrentTourContainer());
        this.guiManager.render(new MinimapContainer());
    }
}
