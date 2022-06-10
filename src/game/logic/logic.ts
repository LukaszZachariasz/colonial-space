import {AnalysisService} from './services/anaylsis/analysis.service';
import {BuildingHandlerService} from './services/building/handler/building-handler.service';
import {BuildingService} from './services/building/building.service';
import {DialogService} from './services/dialog/dialog.service';
import {EnhancedStore} from '@reduxjs/toolkit';
import {FogOfWarService} from './services/fog-of-war/fog-of-war.service';
import {PlanetProductionService} from './services/territory/planet/planet-production.service';
import {SelectedBuildingService} from './services/building/selected-building.service';
import {SelectedTerritoryService} from './services/territory/selected-territory.service';
import {SelectedUnitService} from './services/unit/selected-unit.service';
import {StoreGenerator} from './store-generator/store.generator';
import {TourService} from './services/tour/tour.service';
import {UnitMovementService} from './services/unit/unit-movement.service';
import {UnitService} from './services/unit/unit.service';
import {store} from './store/store';

export class Logic {
    public store: EnhancedStore = store;
    public storeGenerator: StoreGenerator = new StoreGenerator();

    public tourService: TourService = new TourService();
    public dialogService: DialogService = new DialogService();

    public fogOfWarService: FogOfWarService = new FogOfWarService();

    public unitService: UnitService = new UnitService();
    public selectedUnitService: SelectedUnitService = new SelectedUnitService();
    public unitMovementService: UnitMovementService = new UnitMovementService();

    public selectedTerritoryService: SelectedTerritoryService = new SelectedTerritoryService();
    public planetProductionService: PlanetProductionService = new PlanetProductionService();

    public analysisService: AnalysisService = new AnalysisService();

    public buildingService: BuildingService = new BuildingService();
    public selectedBuildingService: SelectedBuildingService = new SelectedBuildingService();
    public buildingHandlerService: BuildingHandlerService = new BuildingHandlerService();
}
