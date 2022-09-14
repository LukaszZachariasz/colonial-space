import {BehaviorSubject} from 'rxjs';
import {Service} from 'typedi';

@Service()
export class SelectedBuildingService {
    public selectedBuildingId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedBuildingId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingId$.next(null);
    }
}
