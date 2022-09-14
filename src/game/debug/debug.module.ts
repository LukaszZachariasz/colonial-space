import {BuildWatcherService} from './build-watcher/build-watcher.service';
import {FpsCounterService} from './fps-counter/fps-counter.service';
import {Module} from '@colonial-space/core/module/module';
import {OpenDebugLayerService} from './open-debug-layer/open-debug-layer.service';

@Module({
    providers: [
        BuildWatcherService,
        FpsCounterService,
        OpenDebugLayerService
    ]
})
export class DebugModule {}
