import {FpsCounterService} from './fps-counter/fps-counter.service';
import {Module} from '@colonial-space/core/module/module.decorator';

@Module({
    providers: [
        FpsCounterService,
    ]
})
export class DebugModule {}
