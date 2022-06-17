import {MainMenuScene} from './scenes/main-menu-scene/main-menu-scene';
import {sceneManager} from 'engine';

export class MainMenu {
    public start(): void {
        sceneManager().register(new MainMenuScene());
        sceneManager().navigateToScene('MainMenuScene');
    }
}
