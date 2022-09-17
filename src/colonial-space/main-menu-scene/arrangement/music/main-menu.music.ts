import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {Routes} from '../../../core/routing/routing.enum';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuMusic implements OnInit, OnLoad, OnUnload {
    @Inject(SCENE) private scene: BABYLON.Scene;

    public music: BABYLON.Sound;

    public gameOnInit(): void {
        this.music = new BABYLON.Sound(
            'Music',
            'resources/sound/main-menu/main-menu.mp3',
            this.scene,
            null,
            {
                loop: true,
                autoplay: false
            }
        );
    }

    public gameOnLoad(): void {
        this.music.autoplay = true;
        this.music.play();
    }

    public gameOnUnload(): void {
        this.music.autoplay = false;
        this.music.stop();
    }
}
