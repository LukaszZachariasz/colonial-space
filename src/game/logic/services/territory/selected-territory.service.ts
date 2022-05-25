import {BehaviorSubject} from 'rxjs';

export class SelectedTerritoryService {
    public selectedTerritoryId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedTerritoryId$.next(id);
    }

    public deselect(): void {
        this.selectedTerritoryId$.next(null);
    }
}
