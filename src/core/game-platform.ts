import {BuildWatcher} from './build-watcher/build-watcher';
import {Debug} from './debug/debug';
import {Engine} from 'engine';
import {GameState} from '../engine/game-state/game-state';
import {GameplayState} from '../engine/game-state/gameplay-state/gameplay-state';
import {GuiManager} from '../engine/gui-manager/gui-manager';
import {LoadingManager} from './loading-manager/loading-manager';
import {SceneManager} from '../engine/scene-manager/scene-manager';

@BuildWatcher(true) // todo: process.env.buildWatcher
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
export const gameEngine = (): Engine => instance.engine;
export const sceneManager = (): SceneManager => instance.engine.sceneManager;
export const guiManager = (): GuiManager => instance.engine.guiManager;
export const gameState = (): GameState => instance.engine.gameState;
export const gameplayState = (): GameplayState => instance.engine.gameState.gameplayState;

