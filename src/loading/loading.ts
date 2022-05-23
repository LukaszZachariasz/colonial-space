import {LoadingScene} from './scenes/loading-scene/loading.scene';
import {sceneManager} from 'engine';

export class Loading {
    public register(): void {
        sceneManager().register(new LoadingScene());
    }
}