import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';

export function GameEntry(): any {
    return function (constructor: any): any {
        const gameEntry = new constructor();
        setTimeout(() => {
            isOnInit(gameEntry) && gameEntry.gameOnInit();
        });
    };
}
