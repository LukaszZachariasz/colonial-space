import {GameInstanceOptions} from './game-instance-options';
import {Injector} from '../injector/injector';
import {LoadingScene} from '../../game/scene/loading/loading.scene';
import {ResolveInjections} from '../injector/resolve-injections';
import {sceneManager} from 'engine';

export function GameInstance(gameInstanceOptions: GameInstanceOptions): any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args);

            instance._loadingScene = new gameInstanceOptions.loadingScene();
            sceneManager().addScene(instance._loadingScene);
            sceneManager().navigateToScene(LoadingScene.SCENE_NAME);
            
            Injector.reset();

            gameInstanceOptions.logic.forEach((logicService: any) => {
                Injector.create(logicService);
            });
            ResolveInjections.resolve$.next(true);

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}
