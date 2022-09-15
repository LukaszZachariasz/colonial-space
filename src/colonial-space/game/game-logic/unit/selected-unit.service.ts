import {BehaviorSubject} from 'rxjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SelectedTerritoryService} from '../territory/selected-territory.service';

@Injectable()
export class SelectedUnitService {
    @Inject(SelectedTerritoryService) private selectedTerritoryService: SelectedTerritoryService;
    
    public selectedUnitId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedTerritoryService.deselect();
        this.selectedUnitId$.next(id);
    }

    public deselect(): void {
        this.selectedUnitId$.next(null);
    }
}
