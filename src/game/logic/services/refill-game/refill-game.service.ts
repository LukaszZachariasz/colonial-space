import {refillUnits} from '../../store/unit/unit.slice';
import {store} from '../../store/store';

export class RefillGameService {
    public refill(): void {
        store.dispatch(refillUnits());
    }
}
