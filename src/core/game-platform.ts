import * as BABYLON from 'babylonjs';
import {BuildWatcher} from './build-watcher/build-watcher';
import {Debug} from './debug/debug';
import {Engine} from 'engine';
import {LoadingManager} from './loading-manager/loading-manager';

@BuildWatcher(true) // todo: process.env.buildWatcher
export class GamePlatform {
  public engine: Engine;
  public debug: Debug = new Debug();
  public loadingManager: LoadingManager = new LoadingManager();

  public startEngine(engine: Engine, canvas: HTMLCanvasElement): void {
    BABYLON.Logger.LogLevels = BABYLON.Logger.ErrorLogLevel,
    this.engine = engine;
    this.engine.initialize(canvas);

    this.debug.start();
  }
}

const instance = new GamePlatform();
export const gamePlatform = (): GamePlatform => instance;
export const gameEngine = (): Engine => instance.engine;
