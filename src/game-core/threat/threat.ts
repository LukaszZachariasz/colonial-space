import {Observable, Subscription, tap} from 'rxjs';
import {gameState, gameplayState} from '../../core/game-platform';

export abstract class Threat {
    public name: string;
    public description: string;

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
                if (gameplayState().currentTour + 1 === this.tourStart) {
                    this.start();
                }
            }),
            tap(() => {
                if (gameplayState().currentTour + 1 === this.tourEnd) {
                    this.stop();
                    this.remove();
                    this.subscription.unsubscribe();
                }
            }),
        ).subscribe();
    }
}
