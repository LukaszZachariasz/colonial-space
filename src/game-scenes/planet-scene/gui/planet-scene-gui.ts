import {BackToGalaxyButton} from './back-to-galaxy-button/back-to-galaxy-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import {gamePlatform} from '../../../core/game-platform';

export class PlanetSceneGui extends GameSceneGui {
    public render(): void {
        gamePlatform().engine.guiManager.render(new BackToGalaxyButton());
        gamePlatform().engine.guiManager.render(new CurrentTourBar());
        gamePlatform().engine.guiManager.render(new ResourceBar());
    }
}
