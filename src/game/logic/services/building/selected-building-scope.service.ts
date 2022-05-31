import {BehaviorSubject} from 'rxjs';

export class SelectedBuildingScopeService {
    public selectedBuildingScopeId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public select(id: string): void {
        this.selectedBuildingScopeId$.next(id);
    }

    public deselect(): void {
        this.selectedBuildingScopeId$.next(null);
    }
}
