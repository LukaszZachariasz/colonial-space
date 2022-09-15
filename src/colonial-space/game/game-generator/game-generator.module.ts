import {GameGeneratorService} from './game-generator.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    providers: [
        GameGeneratorService
    ]
})
export class GameGeneratorModule {}
