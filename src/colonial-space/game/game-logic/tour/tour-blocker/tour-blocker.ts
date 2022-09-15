import {EMPTY, Observable, of, switchMap} from 'rxjs';

export type TourBlockerState = {
    blocking: boolean,
    callback?: () => void
};

export type TourBlockerExecute = () => Observable<TourBlockerState>;

export class TourBlocker {
    constructor(public blocker: TourBlockerExecute) {
    }

    public execute(): Observable<TourBlockerState> {
        return of(EMPTY).pipe(
            switchMap(() => this.blocker())
        );
    }
}
