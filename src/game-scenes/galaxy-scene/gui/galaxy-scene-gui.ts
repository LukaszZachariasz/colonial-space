import {CurrentTourBar} from '../../../gui-objects/current-tour-bar/current-tour-bar';
import {GalaxyNameLabel} from './galaxy-name-label/galaxy-name-label';
import {GalaxyState} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-state';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../gui-objects/resource-bar/resource-bar';

export class GalaxySceneGui extends GameSceneGui {
    constructor(private galaxyState: GalaxyState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new GalaxyNameLabel(this.galaxyState));
        this.guiManager.render(new CurrentTourBar());
        this.guiManager.render(new ResourceBar());
    }
}
