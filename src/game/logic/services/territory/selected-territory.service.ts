import {BehaviorSubject} from 'rxjs';
import {logic} from '../../../game';

export class SelectedTerritoryService {
    public selectedTerritoryId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        logic().selectedUnitService.deselect();
        this.selectedTerritoryId$.next(id);
    }

    public deselect(): void {
        logic().selectedBuildingService.deselect();
        this.selectedTerritoryId$.next(null);
    }
}
