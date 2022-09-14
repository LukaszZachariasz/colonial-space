import {ModelManagerService} from './model-manager/model-manager.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    providers: [
        ModelManagerService
    ]
})
export class CoreModule {}
