import {GuiManagerService} from './gui-manager/gui-manager.service';
import {LoadingManagerService} from './loading-manager/loading-manager.service';
import {ModelManagerService} from './model-manager/model-manager.service';
import {Module} from '@colonial-space/core/module/module';
import {SceneManagerService} from './scene-manager/scene-manager.service';

@Module({
    providers: [
        LoadingManagerService,
        GuiManagerService,
        ModelManagerService,
        SceneManagerService
    ]
})
export class CoreModule {}
