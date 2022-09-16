import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Routes} from '../../core/routing/routing.enum';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuLight implements OnInit {
    @Inject(SCENE(Routes.MainMenuScene)) private scene: BABYLON.Scene;
    
    public gameOnInit(): void {
        const light = new BABYLON.HemisphericLight('menu-light', new BABYLON.Vector3(20, 0, -30), this.scene);
        light.intensity = 0.5;
    }
}
