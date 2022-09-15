import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';
import {take, tap} from 'rxjs';

@Injectable()
export class SceneRouter implements OnInit {
    @Inject(SceneManager) private sceneManager: SceneManager;
    @Inject(SceneGuiManager) private guiManager: SceneGuiManager;
    
    public activeScene: RegisteredScene;

    public gameOnInit(): void {
        this.sceneManager.rootSceneAdded$.pipe(
            take(1),
            tap((name: string) => this.navigate(name))
        ).subscribe();
    }

    public navigate(name: string): void {
        console.log(name);
        this.setScene(this.sceneManager.allScenes.find((el: RegisteredScene) => el.name === name));
    }

    private setScene(gameScene: RegisteredScene): void {
        if (this.activeScene) {
            this.unloadScene();
        }

        this.activeScene = gameScene;
        this.loadScene();
    }

    private unloadScene(): void {
        isOnUnload(this.activeScene.sceneDefinition) && this.activeScene.sceneDefinition.gameOnUnload();
        this.activeScene.componentDefinitions?.forEach((component: any) => isOnUnload(component) && component.gameOnUnload());
        this.guiManager.disposeGuiScene(this.activeScene);
        this.activeScene.scene.detachControl();
    }

    private loadScene(): void {
        isOnLoad(this.activeScene) && this.activeScene.gameOnLoad();
        this.activeScene.componentDefinitions?.forEach((component: any) => isOnLoad(component) && component.gameOnLoad());
        this.guiManager.createGuiScene(this.activeScene);
        this.activeScene.scene.attachControl();
    }
}
