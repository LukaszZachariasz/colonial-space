import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Observable, Subject, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {refillUnits, removeUnit} from '../store/unit/unit.slice';
import {selectSquareByUnitId} from '../store/map/square/square.selectors';
import {setSquareUnitId} from '../store/map/map.slice';
import {store} from '../store/store';

@HasTourEffects()
@Injectable()
export class UnitService {
    public addUnit$: Subject<string> = new Subject<string>();
    public removeUnitId$: Subject<string> = new Subject<string>();

    public removeUnit(id: string): void {
        store.dispatch(removeUnit(id));
        store.dispatch(setSquareUnitId({
            squareId: selectSquareByUnitId(id).id,
            unitId: null
        }));
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
