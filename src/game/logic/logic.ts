import {DialogService} from './services/dialog/dialog.service';
import {EnhancedStore} from '@reduxjs/toolkit';
import {FogOfWarService} from './services/fog-of-war/fog-of-war.service';
import {PlanetProductionService} from './services/territory/planet/planet-production.service';
import {RefillGameService} from './services/refill-game/refill-game.service';
import {SelectedBuildingService} from './services/building/selected-building.service';
import {SelectedTerritoryService} from './services/territory/selected-territory.service';
import {SelectedUnitService} from './services/unit/selected-unit.service';
import {StoreGenerator} from './store-generator/store.generator';
import {TourService} from './services/tour/tour.service';
import {UnitMovementService} from './services/unit/unit-movement.service';
import {store} from './store/store';

export class Logic {
    public store: EnhancedStore = store;
    public storeGenerator: StoreGenerator = new StoreGenerator();

    public tourService: TourService = new TourService();
    public dialogService: DialogService = new DialogService();

    public refillGameService: RefillGameService = new RefillGameService();
    public fogOfWarService: FogOfWarService = new FogOfWarService();
    public selectedUnitService: SelectedUnitService = new SelectedUnitService();
    public unitMovementService: UnitMovementService = new UnitMovementService();
    public selectedTerritoryService: SelectedTerritoryService = new SelectedTerritoryService();
    public selectedBuildingService: SelectedBuildingService = new SelectedBuildingService();
    public planetProductionService: PlanetProductionService = new PlanetProductionService();
}
