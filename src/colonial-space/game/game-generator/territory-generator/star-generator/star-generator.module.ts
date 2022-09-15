import {Module} from '@colonial-space/core/module/module';
import {StarNameGeneratorService} from './star-name/star-name-generator.service';
import {StarSolarGeneratorService} from './star-solar-generator/star-solar-generator.service';

@Module({
    providers: [
        StarNameGeneratorService,
        StarSolarGeneratorService
    ]
})
export class StarGeneratorModule {
}
