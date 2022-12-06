import {MapGeneratorService} from './map-generator.service';
import {Module} from '@colonial-space/core/module/module.decorator';

@Module({
    providers: [MapGeneratorService]
})
export class MapGeneratorModule {}
