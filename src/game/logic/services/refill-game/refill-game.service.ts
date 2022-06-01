import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {refillUnits} from '../../store/unit/unit.slice';
import {store} from '../../store/store';

@HasTourEffects()
export class RefillGameService {
    @AddTourEffect({
        name: 'refill game',
        priority: TourEffectPriorityEnum.REFILL_GAME_OBJECTS
    })
    public refill(): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
            store.dispatch(refillUnits());
            subscriber.next();
            subscriber.complete();
        });
    }
}
