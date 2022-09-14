import {BehaviorSubject} from 'rxjs';
import {SelectedTerritoryService} from '../territory/selected-territory.service';
import {Service} from 'typedi';

@Service()
export class SelectedUnitService {
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    
    constructor(private selectedTerritoryService: SelectedTerritoryService) {
    }

    public select(id: string): void {
        this.selectedTerritoryService.deselect();
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
