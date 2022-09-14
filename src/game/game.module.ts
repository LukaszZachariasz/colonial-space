import {ColonialSpace} from './colonial-space';
import {CoreModule} from './core/core.module';
import {DebugModule} from './debug/debug.module';
import {Module} from '@colonial-space/core/module/module';

@Module({
    imports: [
        CoreModule,
        DebugModule
    ],
    gameEntry: ColonialSpace
})
export class GameModule {
}
