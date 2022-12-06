import {BuildingGeneratorService} from './building-generator.service';
import {Module} from '@colonial-space/core/module/module.decorator';

@Module({
    providers: [
        BuildingGeneratorService
    ]
})
export class BuildingGeneratorModule {}
