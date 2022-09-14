import {isOnReady} from '@colonial-space/core/lifecycle/on-ready/is-on-ready';

export function GameEntry(): any {
    return function (constructor: any): any {
        const gameEntry = new constructor();
        setTimeout(() => {
            if (isOnReady(gameEntry)) {
                gameEntry.gameOnReady();
            }
        });
    };
}
