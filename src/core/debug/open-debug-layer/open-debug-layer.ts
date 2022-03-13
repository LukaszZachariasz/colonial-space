import {gamePlatform} from '../../game-platform';
import {ipcRenderer} from 'electron';

export class OpenDebugLayer {
  public start(): void {
    ipcRenderer.on('open-debug-layer', () => {
      gamePlatform().engine.sceneManager.currentScene.scene.debugLayer.show({
        showInspector: true,
        overlay: true
      });
    });
  }
}
