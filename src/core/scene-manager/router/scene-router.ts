import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {take, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
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
        const scene = this.sceneManager.getScene(name);
        if (scene.initialized && scene.scene.isReady()) {
            this.setScene(scene);
        } else {
            this.sceneManager.load(name).then(() => {
                this.setScene(scene);
            });
        }
    }

    private setScene(gameScene: RegisteredScene): void {
        if (this.activeScene) {
            this.unloadScene();
        }

        this.activeScene = gameScene;
        this.loadScene();
    }

    private unloadScene(): void {
        Lifecycle.onUnload(this.activeScene.sceneDefinition);
        this.activeScene.arrangementDefinitions?.forEach((arrangement: any) => Lifecycle.onUnload(arrangement));
        this.activeScene.providerDefinitions?.forEach((provider: any) => Lifecycle.onUnload(provider));
        this.guiManager.disposeGuiScene(this.activeScene);
        this.activeScene.scene.detachControl();
    }

    private loadScene(): void {
        Lifecycle.onLoad(this.activeScene);
        this.activeScene.arrangementDefinitions?.forEach((component: any) => Lifecycle.onLoad(component));
        this.activeScene.providerDefinitions?.forEach((provider: any) => Lifecycle.onLoad(provider));
        this.guiManager.createGuiScene(this.activeScene);
        this.activeScene.scene.attachControl();
    }
}
