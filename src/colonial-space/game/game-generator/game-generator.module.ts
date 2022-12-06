import {BuildingGeneratorModule} from './building-generator/building-generator.module';
import {GameGeneratorService} from './game-generator.service';
import {MapGeneratorModule} from './map-generator/map-generator.module';
import {Module} from '@colonial-space/core/module/module.decorator';
import {PlayerGeneratorModule} from './player-generator/player-generator.module';
import {TerritoryGeneratorModule} from './territory-generator/territory-generator.module';
import {TourGeneratorModule} from './tour-generator/tour-generator.module';
import {UnitGeneratorModule} from './unit-generator/unit-generator.module';

@Module({
    imports: [
        BuildingGeneratorModule,
        MapGeneratorModule,
        PlayerGeneratorModule,
        TerritoryGeneratorModule,
        TourGeneratorModule,
        UnitGeneratorModule
    ],
    providers: [
        GameGeneratorService
    ]
})
export class GameGeneratorModule {}
