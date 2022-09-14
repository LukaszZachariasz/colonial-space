import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuMusic {
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;

    public music: BABYLON.Sound;

    constructor() {
        this.music = new BABYLON.Sound('Music', 'resources/sound/main-menu/main-menu.mp3', this.scene, null, {
            loop: true,
            autoplay: false
        });
    }

    public play(): void {
        this.music.play(0);
    }

    public stop(): void {
        this.music.stop();
    }
}
