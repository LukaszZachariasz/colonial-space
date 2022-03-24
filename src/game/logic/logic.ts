import {SelectionService} from './selection/selection.service';
import {SquareService} from './square/square.service';
import {TourService} from './tour/tour.service';
import {UnitMovementService} from './unit/unit-movement.service';

export class Logic {
    public squareService: SquareService = new SquareService();
    public tourService: TourService = new TourService();
    public selectionService: SelectionService = new SelectionService();
    public unitMovementService: UnitMovementService = new UnitMovementService();
}
