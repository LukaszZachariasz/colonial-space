import {BehaviorSubject} from 'rxjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SelectedBuildingService} from '../building/selected-building.service';
import {SelectionUnitService} from '../unit/selection-unit.service';

@Injectable()
export class SelectionTerritoryService {
    @Inject('SelectionUnitService') private selectedUnitService: SelectionUnitService;
    @Inject(SelectedBuildingService) private selectedBuildingService: SelectedBuildingService;
    
    public selectedTerritoryId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedUnitService.deselect();
        this.selectedTerritoryId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingService.deselect();
        this.selectedTerritoryId$.next(null);
    }
}
