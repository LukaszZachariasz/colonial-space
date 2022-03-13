import {ipcRenderer} from 'electron';
import {sceneManager} from '../../game-platform';

export class OpenDebugLayer {
  public start(): void {
    ipcRenderer.on('open-debug-layer', () => {
      sceneManager().currentScene.scene.debugLayer.show({
        showInspector: true,
        overlay: true
      });
    });
  }
}
