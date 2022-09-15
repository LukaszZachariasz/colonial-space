import {DebugModule} from './debug/debug.module';
import {ModelManagerService} from './model-manager/model-manager.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    imports: [
        DebugModule
    ],
    providers: [
        ModelManagerService
    ]
})
export class CoreModule {}
