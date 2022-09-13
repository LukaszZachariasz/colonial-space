import {BehaviorSubject} from 'rxjs';

export class SelectedBuildingService {
    public selectedBuildingId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedBuildingId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingId$.next(null);
    }
}
