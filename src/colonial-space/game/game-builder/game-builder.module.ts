import {GameBuilderService} from './game-builder.service';
import {Module} from '@colonial-space/core/module/module';
import {TerritoryFactoryService} from './territory-factory/territory-factory.service';
import {UnitFactoryService} from './unit-factory/unit-factory.service';

@Module({
    providers: [
        TerritoryFactoryService,
        UnitFactoryService,
        GameBuilderService
    ]
})
export class GameBuilderModule {}
