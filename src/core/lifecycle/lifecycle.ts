import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';

export class Lifecycle {
    public static onInit(object: unknown): void {
        isOnInit(object) && object.gameOnInit();
    }

    public static onLoad(object: unknown): void {
        isOnLoad(object) && object.gameOnLoad();
    }

    public static onUnload(object: unknown): void {
        isOnUnload(object) && object.gameOnUnload();
    }

    public static onDestroy(object: unknown): void {
        isOnDestroy(object) && object.gameOnDestroy();
    }
}
