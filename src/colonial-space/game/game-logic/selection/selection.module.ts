import {Module} from '@colonial-space/core/module/module.decorator';
import {SelectionBuildingService} from './building/selection-building.service';
import {SelectionService} from './selection.service';
import {SelectionTerritoryService} from './territory/selection-territory.service';
import {SelectionUnitService} from './unit/selection-unit.service';

@Module({
    providers: [
        SelectionBuildingService,
        SelectionTerritoryService,
        SelectionUnitService,
        SelectionService
    ]
})
export class SelectionModule {}
