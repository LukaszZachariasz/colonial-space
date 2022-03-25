import {BehaviorSubject} from 'rxjs';
import {Selectable} from './selectable';

export class SelectionService {
    public selection$: BehaviorSubject<Selectable> = new BehaviorSubject<Selectable>(null);

    public select(model: Selectable): void {
        this.selection$.next(model);
    }

    public deselect(): void {
        this.selection$.next(null);
    }
}
