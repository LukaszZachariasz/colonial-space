import {Module} from '@colonial-space/core/module/module';
import {SatelliteMoonGeneratorService} from './satellite-moon-generator/satellite-moon-generator.service';
import {SatelliteNameGeneratorService} from './satellite-name/satellite-name-generator.service';

@Module({
    providers: [
        SatelliteNameGeneratorService,
        SatelliteMoonGeneratorService
    ]
})
export class SatelliteGeneratorModule {}
