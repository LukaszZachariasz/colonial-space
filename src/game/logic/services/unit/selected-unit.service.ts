import {BehaviorSubject} from 'rxjs';
import {UnitModel} from '../../../scene/space/model/unit/unit.model';

export class SelectedUnitService {
    public selectedUnit$: BehaviorSubject<UnitModel> = new BehaviorSubject<UnitModel>(null);

    public select(model: UnitModel): void {
        this.selectedUnit$.next(model);
    }

    public deselect(): void {
        this.selectedUnit$.next(null);
    }
}
