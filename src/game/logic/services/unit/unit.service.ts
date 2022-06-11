import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Observable, Subject, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {refillUnits, removeUnit} from '../../store/unit/unit.slice';
import {store} from '../../store/store';

@HasTourEffects()
export class UnitService {
    public removeUnitId$: Subject<string> = new Subject<string>();

    public removeUnit(id: string): void {
        store.dispatch(removeUnit(id));
        this.removeUnitId$.next(id);
    }

    @AddTourEffect({
        name: 'refill unit movement',
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
