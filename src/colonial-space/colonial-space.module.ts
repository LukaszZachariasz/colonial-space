import {ColonialSpace} from './colonial-space';
import {CoreModule} from './core/core.module';
import {DebugModule} from '@colonial-space/debug/debug.module';
import {GameModule} from './game/game.module';
import {LoadingSceneModule} from './loading-scene/loading-scene.module';
import {MainMenuSceneModule} from './main-menu-scene/main-menu-scene.module';
import {Module} from '@colonial-space/core/module/module';
import {SharedModule} from './shared/shared.module';

@Module({
    imports: [
        CoreModule,
        DebugModule,
        SharedModule,
        LoadingSceneModule,
        MainMenuSceneModule,
        GameModule
    ],
    gameEntry: ColonialSpace
})
export class ColonialSpaceModule {
}
