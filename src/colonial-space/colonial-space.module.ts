import {DebugModule} from '@colonial-space/debug/debug.module';
import {GameModule} from './game/game.module';
import {LoadingSceneModule} from './loading-scene/loading-scene.module';
import {MainMenuSceneModule} from './main-menu-scene/main-menu-scene.module';
import {Module} from '@colonial-space/core/module/module.decorator';

@Module({
    imports: [
        DebugModule,
        LoadingSceneModule,
        MainMenuSceneModule,
        GameModule
    ]
})
export class ColonialSpaceModule {
}
