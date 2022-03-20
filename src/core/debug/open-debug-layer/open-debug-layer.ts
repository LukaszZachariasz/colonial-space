import {ipcRenderer} from 'electron';
import {sceneManager} from 'engine';

export class OpenDebugLayer {
  public start(): void {
    ipcRenderer.on('open-debug-layer', () => {
      sceneManager().currentBabylonScene.debugLayer.show({
        showInspector: true,
        overlay: true
      });
    });
  }
}
