import {AnalysisService} from './anaylsis/analysis.service';
import {AnalysisShipBuildingHandlerService} from './building/handler/units/analysis-ship/analysis-ship-building-handler.service';
import {BuildingService} from './building/building.service';
import {ColonialShipBuildingHandlerService} from './building/handler/units/colonial-ship/colonial-ship-building-handler.service';
import {ColonizationService} from './colonization/colonization.service';
import {DialogService} from './dialog/dialog.service';
import {FogOfWarService} from './fog-of-war/fog-of-war.service';
import {Module} from '@colonial-space/core/module/module';
import {PlanetProductionService} from './territory/planet/planet-production.service';
import {ScoutShipBuildingHandlerService} from './building/handler/units/scout-ship/scout-ship-building-handler.service';
import {SelectedBuildingService} from './building/selected-building.service';
import {SelectedTerritoryService} from './territory/selected-territory.service';
import {SelectedUnitService} from './unit/selected-unit.service';
import {SunlightAmplifierBuildingHandlerService} from './building/handler/common/sunlight-amplifier-building-handler.service';
import {TourService} from './tour/tour.service';
import {UnitMovementService} from './unit/unit-movement.service';
import {UnitService} from './unit/unit.service';
import {WaterFilterBuildingHandlerService} from './building/handler/common/water-filter-building-handler.service';

@Module({
    providers: [
        AnalysisService,
        
        SunlightAmplifierBuildingHandlerService,
        WaterFilterBuildingHandlerService,
        AnalysisShipBuildingHandlerService,
        ColonialShipBuildingHandlerService,
        ScoutShipBuildingHandlerService,
        BuildingService,
        SelectedBuildingService,
        
        ColonizationService,
        DialogService,
        FogOfWarService,
        
        PlanetProductionService,
        SelectedTerritoryService,
        
        TourService,
        
        SelectedUnitService,
        UnitService,
        UnitMovementService
    ]
})
export class GameLogicModule {}
