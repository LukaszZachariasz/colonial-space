import {BehaviorSubject} from 'rxjs';
import {TerritoryModel} from '../../../scene/space/model/territory/territory.model';

export class SelectedTerritoryService {
    public selectedTerritory$: BehaviorSubject<TerritoryModel> = new BehaviorSubject<TerritoryModel>(null);

    public select(model: TerritoryModel): void {
        this.selectedTerritory$.next(model);
    }

    public deselect(): void {
        this.selectedTerritory$.next(null);
    }
}
