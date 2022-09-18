import {Injectable} from '@colonial-space/core/injector/injectable';
import {RegisteredScene} from '@colonial-space/core/module/scene/registered-scene';

@Injectable({
    providedIn: 'root'
})
export class SceneManager {
    private allScenes: RegisteredScene[] = [];

    public getScene(name: string): RegisteredScene {
        return this.allScenes.find((el: RegisteredScene) => el.name === name);
    }

    public addScene(registerScene: RegisteredScene): void {
        this.allScenes.push(registerScene);
    }
}
