import {TourState} from '../../store/tour/tour.state';

export class TourGenerator {
    public static generate(): TourState {
        return {
            tour: 1
        };
    }
}