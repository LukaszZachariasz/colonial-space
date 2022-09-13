import {FpsCounterService} from './fps-counter/fps-counter.service';
import {OpenDebugLayerService} from './open-debug-layer/open-debug-layer.service';
import {Service} from 'typedi';

@Service()
export class DebugService {
    constructor(private fpsCounter: FpsCounterService,
                private openDebugLayer: OpenDebugLayerService) {
    }

    public start(): void {
        this.fpsCounter.start();
        this.openDebugLayer.start();
    }
}
