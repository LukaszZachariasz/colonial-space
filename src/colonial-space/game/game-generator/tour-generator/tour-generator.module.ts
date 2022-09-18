import {Module} from '@colonial-space/core/module/module.decorator';
import {TourGeneratorService} from './tour-generator.service';

@Module({
    providers: [TourGeneratorService]
})
export class TourGeneratorModule {}
