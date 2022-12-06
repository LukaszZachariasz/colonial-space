import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectionBuildingService} from './building/selection-building.service';
import {SelectionTerritoryService} from './territory/selection-territory.service';
import {SelectionUnitService} from './unit/selection-unit.service';
import {filter, tap} from 'rxjs';

@Injectable()
export class SelectionService implements OnInit {
    @Inject(SelectionBuildingService) private selectionBuildingService: SelectionBuildingService;
    @Inject(SelectionTerritoryService) private selectionTerritoryService: SelectionTerritoryService;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;
    
    public gameOnInit(): void {
        this.selectionUnitService.selectedUnitId$.pipe(
            filter((id: string) => !!id),
            tap(() => this.selectionTerritoryService.deselect()),
            tap(() => this.selectionBuildingService.deselect()),
        ).subscribe();
        
        this.selectionTerritoryService.selectedTerritoryId$.pipe(
            filter((id: string) => !!id),
            tap(() => this.selectionUnitService.deselect()),
        ).subscribe();
    }

    public deselectAll(): void {
        this.selectionBuildingService.deselect();
        this.selectionTerritoryService.deselect();
        this.selectionUnitService.deselect();
    }
}
