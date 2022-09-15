import {Module} from '@colonial-space/core/module/module';
import {PlanetGeneratorService} from './planet-generator.service';
import {PlanetGreenGeneratorService} from './planet-green-generator/planet-green-generator.service';
import {PlanetMetalGeneratorService} from './planet-metal-generator/planet-metal-generator.service';
import {PlanetNameGeneratorService} from './planet-name/planet-name-generator.service';
import {PlanetRingedGeneratorService} from './planet-ringed-generator/planet-ringed-generator.service';
import {PlanetSandGeneratorService} from './planet-sand-generator/planet-sand-generator.service';

@Module({
    providers: [
        PlanetNameGeneratorService,
        PlanetGreenGeneratorService,
        PlanetMetalGeneratorService,
        PlanetRingedGeneratorService,
        PlanetSandGeneratorService,
        PlanetGeneratorService
    ]
})
export class PlanetGeneratorModule {}
