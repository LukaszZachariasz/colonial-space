import {EnhancedStore} from '@reduxjs/toolkit';
import {FogOfWarService} from './services/fog-of-war/fog-of-war.service';
import {RefillGameService} from './services/refill-game/refill-game.service';
import {SelectedUnitService} from './services/unit/selected-unit.service';
import {StoreGenerator} from './store-generator/store.generator';
import {TourService} from './services/tour/tour.service';
import {UnitMovementService} from './services/unit/unit-movement.service';
import {store} from './store/store';

export class Logic {
    public store: EnhancedStore = store;
    public storeGenerator: StoreGenerator = new StoreGenerator();

    public tourService: TourService = new TourService();

    public refillGameService: RefillGameService = new RefillGameService();
    public fogOfWarService: FogOfWarService = new FogOfWarService();
    public selectedUnitService: SelectedUnitService = new SelectedUnitService();
    public unitMovementService: UnitMovementService = new UnitMovementService();
}
