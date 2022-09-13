import {Subject, forkJoin, switchMap, tap} from 'rxjs';
import {TourBlocker, TourBlockerState} from './tour-blocker';

export class TourBlockerService {
    public completeTourBlocker$ = new Subject<TourBlockerState[]>();
    public tourBlockers: TourBlocker[] = [];

    private currentTourBlockers: TourBlockerState[] = [];
    private executeBlockers$ = new Subject<void>();

    constructor() {
        this.executeBlockers$.pipe(
            tap(() => {
                this.currentTourBlockers = [];
            }),
            switchMap(() => forkJoin(
                    this.tourBlockers.map((el: TourBlocker) => el.execute().pipe(
                            tap((result: TourBlockerState) => result.blocking && this.currentTourBlockers.push(result))
                        )
                    )
                )
            ),
            tap(() => {
                this.completeTourBlocker$.next(this.currentTourBlockers);
            })
        ).subscribe();
    }

    public runBlockers(): void {
        if (this.tourBlockers.length === 0) {
            this.completeTourBlocker$.next([]);
        } else {
            this.executeBlockers$.next();
        }
    }

    public addTourBlocker(blocker: TourBlocker): void {
        this.tourBlockers.push(blocker);
    }

    public removeTourBlocker(blocker: TourBlocker): void {
        this.tourBlockers = this.tourBlockers.filter((tourBlocker: TourBlocker) => tourBlocker !== blocker);
    }
}
