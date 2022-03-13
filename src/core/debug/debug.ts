import {FpsCounter} from './fps-counter/fps-counter';
import {OpenDebugLayer} from './open-debug-layer/open-debug-layer';

export class Debug {
  private fpsCounter: FpsCounter = new FpsCounter();
  private openDebugLayer: OpenDebugLayer = new OpenDebugLayer();

  public start(): void {
    this.fpsCounter.start();
    this.openDebugLayer.start();
  }
}
