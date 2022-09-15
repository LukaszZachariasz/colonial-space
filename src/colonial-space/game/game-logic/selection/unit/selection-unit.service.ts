import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class SelectionUnitService {
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
