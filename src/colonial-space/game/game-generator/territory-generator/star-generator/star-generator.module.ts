import {Module} from '@colonial-space/core/module/module.decorator';
import {StarGeneratorService} from './star-generator.service';
import {StarNameGeneratorService} from './star-name/star-name-generator.service';
import {StarSolarGeneratorService} from './star-solar-generator/star-solar-generator.service';

@Module({
    providers: [
        StarNameGeneratorService,
        StarSolarGeneratorService,
        StarGeneratorService
    ]
})
export class StarGeneratorModule {
}
