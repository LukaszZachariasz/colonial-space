import {AsteroidGeneratorModule} from './asteroid-generator/asteroid-generator.module';
import {BlackHoleGeneratorModule} from './black-hole-generator/black-hole-generator.module';
import {Module} from '@colonial-space/core/module/module';
import {PlanetGeneratorModule} from './planet-generator/planet-generator.module';
import {SatelliteGeneratorModule} from './satellite-generator/satellite-generator.module';
import {StarGeneratorModule} from './star-generator/star-generator.module';
import {TerritoryGeneratorService} from './territory-generator.service';

@Module({
    imports: [
        AsteroidGeneratorModule,
        BlackHoleGeneratorModule,
        PlanetGeneratorModule,
        SatelliteGeneratorModule,
        StarGeneratorModule
    ],
    providers: [TerritoryGeneratorService]
})
export class TerritoryGeneratorModule {}
