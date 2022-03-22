import {SelectModelManager} from './select-model-manager/select-model-manager';
import {TourManager} from './tour-manager/tour-manager';

export class Logic {
    public tourManager: TourManager = new TourManager();
    public selectModelManager: SelectModelManager = new SelectModelManager();
}
