import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class SelectionTerritoryService {
    public selectedTerritoryId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedTerritoryId$.next(id);
    }

    public deselect(): void {
        this.selectedTerritoryId$.next(null);
    }
}
