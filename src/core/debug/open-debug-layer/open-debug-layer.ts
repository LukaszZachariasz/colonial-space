import {ipcRenderer} from 'electron';
import sceneLoader from '../../../engine/scene-loader/scene-loader';

export class OpenDebugLayer {
  public start(): void {
    ipcRenderer.on('open-debug-layer', () => {
      sceneLoader.currentScene.scene.debugLayer.show({
        showInspector: true,
        overlay: true
      });
    });
  }
}
