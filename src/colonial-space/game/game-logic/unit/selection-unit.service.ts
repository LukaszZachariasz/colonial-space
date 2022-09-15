import {BehaviorSubject} from 'rxjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SelectionTerritoryService} from '../territory/selection-territory.service';

@Injectable()
export class SelectionUnitService {
    @Inject(SelectionTerritoryService) private selectedTerritoryService: SelectionTerritoryService;
    
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedTerritoryService.deselect();
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
