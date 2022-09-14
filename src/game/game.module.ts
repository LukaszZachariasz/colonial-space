import {CoreModule} from './core/core.module';
import {DebugModule} from './debug/debug.module';
import {GameService} from './game.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    imports: [
        CoreModule,
        DebugModule
    ],
    providers: [GameService]
})
export class GameModule {
}
