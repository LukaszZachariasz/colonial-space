import {Observable, Subscription, tap} from 'rxjs';
import {ThreatTypeEnum} from './threat-type.enum';
import {gameState, gameplayState} from '../../core/game-platform';

export abstract class Threat<T = any> {
    public name: string;
    public description: string;
    public type: ThreatTypeEnum;
    public data: T;

    public abstract start(): void;
    public abstract stop(): void;
    public abstract remove(): void;

    private remove$: Observable<void>;
    private subscription: Subscription;

    protected constructor(public tourStart: number,
                          public tourEnd: number,
                          public visibleFromTour: number,
                          public unknownUntilTour: number) {
        this.subscription = gameState().tourManager.completeTour$.pipe(
            tap(() => {
                if (gameplayState().tour.currentTour + 1 === this.tourStart) {
                    this.start();
                }
            }),
            tap(() => {
                if (gameplayState().tour.currentTour + 1 === this.tourEnd) {
                    this.stop();
                    this.remove();
                    this.subscription.unsubscribe();
                }
            }),
        ).subscribe();
    }
}
