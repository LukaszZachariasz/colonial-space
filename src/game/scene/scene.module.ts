import {LoadingModule} from './loading/loading.module';
import {MainMenuModule} from './main-menu/main-menu.module';
import {Module} from '@colonial-space/core/module/module';

@Module({
    imports: [
        LoadingModule,
        MainMenuModule
    ]
})
export class SceneModule {}
