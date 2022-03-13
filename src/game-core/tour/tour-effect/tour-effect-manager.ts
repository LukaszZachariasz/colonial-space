import {Subject, forkJoin, map, switchMap, tap} from 'rxjs';
import {gameplayState, gameState} from '../../../core/game-platform';
import {TourEffect} from './tour-effect';

type ExecuteEffectGroup = {current: TourEffect[], pending: TourEffect[][]};

export class TourEffectManager {
    public completeTourEffects$ = new Subject<void>();

    private executeEffectGroup$ = new Subject<ExecuteEffectGroup>();

    constructor() {
        this.executeEffectGroup$.pipe(
            switchMap((executeEffectGroup: ExecuteEffectGroup) =>
                forkJoin(executeEffectGroup.current.map((el: TourEffect) => el.execute())).pipe(
                    tap(() => gameplayState().tourState.tourEffects = gameplayState().tourState.tourEffects.filter((el: TourEffect) => !el.onlyOnce)),
                    map(() => executeEffectGroup)
                )
            ),
            tap((executeEffectGroup: ExecuteEffectGroup) => {
                if (executeEffectGroup.pending.length) {
                    this.executeEffectGroup$.next({
                        current: executeEffectGroup.pending.shift(),
                        pending: executeEffectGroup.pending
                    });
                } else {
                    this.completeTourEffects$.next();
                }
            })
        ).subscribe();
    }

    public runEffects(): void {
        const groupOfEffects = this.createGroupOfEffects();

        if (groupOfEffects.length === 0) {
            this.completeTourEffects$.next();
        } else {
            this.executeEffectGroup$.next({
                current: groupOfEffects.shift(),
                pending: groupOfEffects
            });
        }
    }

    public addTourEffect(effect: TourEffect): void {
        gameplayState().tourState.tourEffects.push(effect);
        gameplayState().tourState.tourEffects.sort(this.sortByPriority);
    }

    public removeTourEffect(effect: TourEffect): void {
        gameplayState().tourState.tourEffects = gameplayState().tourState.tourEffects.filter((tourEffect: TourEffect) => tourEffect !== effect);
    }

    private sortByPriority(a: TourEffect, b: TourEffect): 1 | -1 | 0 {
        if (a.priority > b.priority) {
            return 1;
        }
        if (b.priority > a.priority) {
            return -1;
        }
        return 0;
    }

    private createGroupOfEffects(): TourEffect[][] {
        const groups: TourEffect[][] = [];
        let copy = [...gameplayState().tourState.tourEffects];

        while (copy.length) {
            const priority = copy[0].priority;
            groups.push(copy.filter((el: TourEffect) => el.priority === priority));
            copy = copy.filter((el: TourEffect) => el.priority !== priority);
        }
        return groups;
    }
}
