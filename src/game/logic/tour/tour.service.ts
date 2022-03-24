import {Subject, tap} from 'rxjs';
import {TourEffect} from './tour-effect/tour-effect';
import {TourEffectService} from './tour-effect/tour-effect.service';
import {store} from '../../game';

export class TourService {
    public startWaitingForTourEffects$ = new Subject<void>();
    public completeTour$ = new Subject<void>();

    private tourEffectManager: TourEffectService = new TourEffectService();
    private isRunningNextTure = false;

    constructor() {
        this.tourEffectManager.completeTourEffects$.pipe(
            tap(() => store().tour.tour++),
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
