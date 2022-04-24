import {TourState} from '../../store/tour/tour.state';

export class TourGenerator {
    public generate(): TourState {
        return {
            tour: 1
        };
    }
}
