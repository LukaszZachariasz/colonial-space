import {BehaviorSubject} from 'rxjs';
import {Selectable} from './selectable';

export class SelectModelManager {
    public selected$: BehaviorSubject<Selectable> = new BehaviorSubject<Selectable>(null);

    public select(model: Selectable): void {
        this.selected$.next(model);
    }
}
