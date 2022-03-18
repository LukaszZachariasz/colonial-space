import {TourState} from '../../game-state/tour/tour.state';

export class TourGenerator {
    public generate(): TourState {
        return {
            tour: 1,
            tourEffects: []
        };
    }
}
