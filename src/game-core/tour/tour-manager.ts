import {Subject, tap} from 'rxjs';
import {TourEffect} from './tour-effect/tour-effect';
import {TourEffectManager} from './tour-effect/tour-effect-manager';

export class TourManager {
    public tour = 1;
    public startWaitingForTourEffects$ = new Subject<void>();
    public completeTour$ = new Subject<void>();

    private tourEffectManager: TourEffectManager = new TourEffectManager();
    private isRunningNextTure = false;

    constructor() {
        this.tourEffectManager.completeTourEffects$.pipe(
            tap(() => this.tour++),
            tap(() => this.isRunningNextTure = false),
            tap(() => this.completeTour$.next())
        ).subscribe();
    }

    public nextTour(): void {
        if (this.isRunningNextTure) {
            return;
        }

        this.isRunningNextTure = true;
        this.startWaitingForTourEffects$.next();
        this.tourEffectManager.runEffects();
    }

    public addTourEffect(effect: TourEffect): void {
        this.tourEffectManager.addTourEffect(effect);
    }
}