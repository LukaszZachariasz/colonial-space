import {BehaviorSubject} from 'rxjs';

export class SelectedUnitService {
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
