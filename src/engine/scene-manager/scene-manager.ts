import {Scene} from '../../scenes/scene';
import {SceneRoute} from './scene-route';
import {guiManager} from '../../core/game-platform';

export class SceneManager {
    public currentScene: Scene;
    public allScenes: Scene[] = [];

    public addScene(route: SceneRoute, gameScene: Scene): void {
        const exists = this.allScenes.find((el: Scene) => route.route === el.route.route);
        if (exists) {
            throw new Error(`Scene with route ${gameScene.route.route} already exists`);
        }
        gameScene.route = route;
        this.allScenes.push(gameScene);
    }

    public navigateToScene(route: string): void {
        const scene = this.allScenes.find((gameScene: Scene) => gameScene.route.route === route);
        if (!scene) {
            throw new Error(`Scene with route ${route} is not found. Can't navigate to unknown routing.`);
        }
        this.setCurrentScene(scene);
    }

    public navigateBack(): void {
        this.navigateToScene(this.currentScene.route.parent.route);
    }

    private setCurrentScene(gameScene: Scene): void {
        if (this.currentScene) {
            this.currentScene.scene.detachControl();
        }
        this.currentScene = {...gameScene};
        guiManager().reset();

        this.currentScene.scene.attachControl();
    }
}
