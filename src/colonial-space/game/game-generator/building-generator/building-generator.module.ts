import {BuildingGeneratorService} from './building-generator.service';
import {Module} from '@colonial-space/core/module/module';

@Module({
    providers: [
        BuildingGeneratorService
    ]
})
export class BuildingGeneratorModule {}
