import {BackToGalaxyButton} from './back-to-galaxy-button/back-to-galaxy-button';
import {CurrentTourBar} from '../../../gui-objects/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../gui-objects/resource-bar/resource-bar';

export class PlanetSceneGui extends GameSceneGui {
    public render(): void {
        this.guiManager.render(new BackToGalaxyButton());
        this.guiManager.render(new CurrentTourBar());
        this.guiManager.render(new ResourceBar());
    }
}
