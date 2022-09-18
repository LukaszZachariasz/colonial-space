import {BlackHoleGeneratorService} from './black-hole-generator.service';
import {BlackHoleNameGeneratorService} from './black-hole-name/black-hole-name-generator.service';
import {Module} from '@colonial-space/core/module/module.decorator';

@Module({
    providers: [
        BlackHoleNameGeneratorService,
        BlackHoleGeneratorService
    ]
})
export class BlackHoleGeneratorModule {}
