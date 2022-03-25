import {TourState} from '../../tour/tour.state';

export class TourGenerator {
    public generate(): TourState {
        return {
            tour: 1,
            tourEffects: []
        };
    }
}
