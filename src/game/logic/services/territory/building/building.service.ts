import {BuildingScopeState} from '../../../store/territory/building/building-scope.state';
import {Subject} from 'rxjs';

export class BuildingService {
    public openedBuildingScopeState$: Subject<BuildingScopeState> = new Subject<BuildingScopeState>();

    public open(buildingScopeState: BuildingScopeState): void {
        this.openedBuildingScopeState$.next(buildingScopeState);
    }

    public close(): void {
        this.openedBuildingScopeState$.next(null);
    }
}
