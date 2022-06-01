import {Subject, tap} from 'rxjs';
import {TourEffect} from './tour-effect/tour-effect';
import {TourEffectService} from './tour-effect/tour-effect.service';
import {nextTour} from '../../store/tour/tour.slice';
import {store} from '../../store/store';

export class TourService {
    public startWaitingForTourEffects$ = new Subject<void>();
    public completeTour$ = new Subject<void>();

    private tourEffectManager: TourEffectService = new TourEffectService();
    private isRunningNextTour = false;

    constructor() {
        this.tourEffectManager.completeTourEffects$.pipe(
            tap(() => store.dispatch(nextTour())),
            tap(() => this.isRunningNextTour = false),
            tap(() => this.completeTour$.next())
        ).subscribe();
    }

    public nextTour(): void {
        if (this.isRunningNextTour) {
            return;
        }

        this.isRunningNextTour = true;
        this.startWaitingForTourEffects$.next();
        this.tourEffectManager.runEffects();
    }

    public addTourEffect(effect: TourEffect): void {
        this.tourEffectManager.addTourEffect(effect);
    }
}
