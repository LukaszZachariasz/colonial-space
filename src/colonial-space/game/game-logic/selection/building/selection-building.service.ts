import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class SelectionBuildingService {
    public selectedBuildingId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedBuildingId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingId$.next(null);
    }
}
