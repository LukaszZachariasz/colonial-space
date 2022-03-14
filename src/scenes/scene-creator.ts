import {Scene} from './scene';
import {SceneRoute} from '../engine/scene-manager/scene-route';
import {sceneManager} from '../core/game-platform';

export abstract class SceneCreator<T> {
    public route: SceneRoute;
    public abstract create(state: T, parentRoute: SceneRoute): void;

    protected createRoute(route: string, parentRoute: SceneRoute): SceneRoute {
        this.route = new SceneRoute(route, parentRoute);
        return this.route;
    }
    
    protected addScene(scene: Scene): void {
        sceneManager().addScene(this.route, scene);
    }
}
