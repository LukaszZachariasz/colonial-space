import {BuildWatcher} from './build-watcher/build-watcher';
import {Debug} from './debug/debug';
import {Engine} from 'engine';
import {LoadingManager} from './loading-manager/loading-manager';

@BuildWatcher(true)
export class GamePlatform {
  public engine: Engine;
  public debug: Debug = new Debug();
  public loadingManager: LoadingManager = new LoadingManager();

  public startEngine(engine: Engine, canvas: HTMLCanvasElement): void {
    this.engine = engine;
    this.engine.initialize(canvas);

    this.debug.start();
  }
}

const instance = new GamePlatform();
export const gamePlatform = (): GamePlatform => instance;
