import {BehaviorSubject} from 'rxjs';
import {LoadingScene} from '../../game-scenes/loading-scene/loading-scene';

export class LoadingSceneManager {
    public loadingScene: LoadingScene;
    public isLoading$ = new BehaviorSubject(false);
    public loadingScenesUuid: string[] = [];

    public initialize(): void {
        this.loadingScene = new LoadingScene();
    }

    public startLoading(uuid: string): void {
        this.loadingScenesUuid.push(uuid);
        this.isLoading$.next(!!this.loadingScenesUuid.length);
    }

    public stopLoading(uuid: string): void {
        this.loadingScenesUuid = this.loadingScenesUuid.filter((el: string) => el !== uuid);
        this.isLoading$.next(!!this.loadingScenesUuid.length);
    }
}

const instance = new LoadingSceneManager();
export default instance;