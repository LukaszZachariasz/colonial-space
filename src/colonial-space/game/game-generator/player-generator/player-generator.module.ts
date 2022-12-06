import {Module} from '@colonial-space/core/module/module.decorator';
import {PlayerGeneratorService} from './player-generator.service';

@Module({
    providers: [PlayerGeneratorService]
})
export class PlayerGeneratorModule {}
