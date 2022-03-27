import {EnhancedStore} from '@reduxjs/toolkit';
import {SelectionService} from './services/selection/selection.service';
import {StoreGenerator} from './services/store-generator/store.generator';
import {TourService} from './services/tour/tour.service';
import {UnitMovementService} from './services/unit/unit-movement.service';
import {store} from './store/store';

export class Logic {
    public store: EnhancedStore = store;

    public storeGenerator: StoreGenerator = new StoreGenerator();
    public tourService: TourService = new TourService();
    public selectionService: SelectionService = new SelectionService();
    public unitMovementService: UnitMovementService = new UnitMovementService();
}
