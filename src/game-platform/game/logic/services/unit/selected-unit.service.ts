import {BehaviorSubject} from 'rxjs';
import {logic} from '../../../game';

export class SelectedUnitService {
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        logic().selectedTerritoryService.deselect();
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
