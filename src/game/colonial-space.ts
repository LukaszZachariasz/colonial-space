import {Game} from './scene/game/game';
import {GameEntry} from '@colonial-space/core/module/game-entry/game-entry';

@GameEntry()
export class ColonialSpace {
    constructor(private game: Game) {
    }

    public newGame(): void {
        this.game.generate();
        this.game.start();
    }
}
