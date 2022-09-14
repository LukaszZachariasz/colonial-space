import {BehaviorSubject} from 'rxjs';
import {SelectedBuildingService} from '../building/selected-building.service';
import {SelectedUnitService} from '../unit/selected-unit.service';
import {Service} from 'typedi';

@Service()
export class SelectedTerritoryService {
    public selectedTerritoryId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    
    constructor(private selectedUnitService: SelectedUnitService,
                private selectedBuildingService: SelectedBuildingService) {
    }

    public select(id: string): void {
        this.selectedUnitService.deselect();
        this.selectedTerritoryId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingService.deselect();
        this.selectedTerritoryId$.next(null);
    }
}
