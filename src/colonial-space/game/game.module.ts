import {GameGeneratorModule} from './game-generator/game-generator.module';
import {GameLogicModule} from './game-logic/game-logic.module';
import {GameService} from './game.service';
import {Module} from '@colonial-space/core/module/module';
import {SpaceSceneModule} from './space-scene/space-scene.module';

@Module({
    imports: [
        GameGeneratorModule,
        GameLogicModule,
        SpaceSceneModule
    ],
    providers: [
        GameService
    ]
})
export class GameModule {}
