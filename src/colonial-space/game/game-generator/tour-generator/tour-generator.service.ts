import {Injectable} from '@colonial-space/core/injector/injectable';
import {TourState} from '../../game-logic/store/tour/tour.state';

@Injectable()
export class TourGeneratorService {
    public generate(): TourState {
        return {
            tour: 1
        };
    }
}
