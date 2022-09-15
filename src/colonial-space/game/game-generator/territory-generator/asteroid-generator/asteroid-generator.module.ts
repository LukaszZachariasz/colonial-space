import {AsteroidGeneratorService} from './asteroid-generator.service';
import {AsteroidNameGeneratorService} from './asteroid-name/asteroid-name-generator.service';
import {AsteroidVolcanicGeneratorService} from './asteroid-volcanic/asteroid-volcanic-generator.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    providers: [
        AsteroidNameGeneratorService,
        AsteroidVolcanicGeneratorService,
        AsteroidGeneratorService
    ]
})
export class AsteroidGeneratorModule {}
