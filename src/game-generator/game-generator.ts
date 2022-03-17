import {GameSeed} from './game-seed';
import {GameState} from '../game-state/game.state';
import {MapGenerator} from './map-generator/map-generator';

export class GameGenerator {
    public static readonly SeedSalt = 100000000;
    public static GameSeed: GameSeed = NaN;

    public static RandomSeed(): GameSeed {
        return Math.floor(Math.random() * GameGenerator.SeedSalt);
    }

    public static CheckProbability(gameSeed: GameSeed, percentage: number): boolean {
        return gameSeed % percentage === 0;
    }

    private mapGenerator: MapGenerator = new MapGenerator();

    public generate(gameSeed: GameSeed = GameGenerator.RandomSeed()): GameState {
        GameGenerator.GameSeed = gameSeed;
        return {
            map: this.mapGenerator.generate()
        };
    }
}