import {Subject, filter, take, tap} from 'rxjs';
import {TourBlocker, TourBlockerState} from './tour-blocker/tour-blocker';
import {TourBlockerService} from './tour-blocker/tour-blocker.service';
import {TourEffect} from './tour-effect/tour-effect';
import {TourEffectService} from './tour-effect/tour-effect.service';
import {nextTour} from '../../store/tour/tour.slice';
import {store} from '../../store/store';

export class TourService {
    public startWaitingForTourEffects$ = new Subject<void>();
    public completeTour$ = new Subject<void>();

    private tourEffectService: TourEffectService = new TourEffectService();
    private tourBlockerService: TourBlockerService = new TourBlockerService();
    private isRunningNextTour = false;

    constructor() {
        this.tourEffectService.completeTourEffects$.pipe(
            tap(() => store.dispatch(nextTour())),
            tap(() => this.isRunningNextTour = false),
            tap(() => this.completeTour$.next())
        ).subscribe();
    }

    public nextTour(): void {
        if (this.isRunningNextTour) {
            return;
        }

        this.tourBlockerService.completeTourBlocker$.pipe(
            take(1),
            tap((blockers: TourBlockerState[]) => {
                if (blockers.length > 0) {
                    const blockerState = blockers.find((el: TourBlockerState) => el.callback);
                    if (blockerState) {
                        blockerState.callback();
                    }
                }
            }),
            filter((blockers: TourBlockerState[]) => blockers.length === 0),
            tap(() => {
                this.isRunningNextTour = true;
            }),
            tap(() => {
                this.startWaitingForTourEffects$.next();
            }),
            tap(() => {
                this.tourEffectService.runEffects();
            })
        ).subscribe();

        this.tourBlockerService.runBlockers();
    }

    public addTourEffect(effect: TourEffect): void {
        this.tourEffectService.addTourEffect(effect);
    }

    public removeTourEffect(effect: TourEffect): void {
        this.tourEffectService.removeTourEffect(effect);
    }

    public addTourBlocker(blocker: TourBlocker): void {
        this.tourBlockerService.addTourBlocker(blocker);
    }
}
