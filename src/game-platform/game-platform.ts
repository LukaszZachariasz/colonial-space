import * as BABYLON from 'babylonjs';
import {BuildWatcher} from './core/build-watcher/build-watcher';
import {Container} from 'typedi';
import {DebugService} from './core/debug/debug.service';
import {Engine} from 'engine';
import {Service} from 'typedi';

@BuildWatcher(process.env.PROFILE !== 'prod')
@Service()
export class GamePlatform {
  constructor(private engine: Engine,
              private debug: DebugService) {
  }

  public bootstrap(canvas: HTMLCanvasElement): void {
    BABYLON.Logger.LogLevels = BABYLON.Logger.ErrorLogLevel;
    this.engine.initialize(canvas);

    this.debug.start();
  }
}

export const gameEngine = (): Engine => Container.get(Engine);
