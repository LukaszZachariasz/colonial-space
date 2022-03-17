import {Subject, forkJoin, map, switchMap, tap} from 'rxjs';
import {TourEffect} from './tour-effect';

type ExecuteEffectGroup = {current: TourEffect[], pending: TourEffect[][]};

export class TourEffectManager {
    public completeTourEffects$ = new Subject<void>();

    private executeEffectGroup$ = new Subject<ExecuteEffectGroup>();

    constructor() {
        this.executeEffectGroup$.pipe(
            switchMap((executeEffectGroup: ExecuteEffectGroup) =>
                forkJoin(executeEffectGroup.current.map((el: TourEffect) => el.execute())).pipe(
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
            }),
           /* tap(() => gameplayState().tour.tourEffects
                .filter((el: TourEffect) => el.toTour)
                .filter((el: TourEffect) => gameplayState().tour.currentTour >= el.toTour)
                .forEach((el: TourEffect) => this.removeTourEffect(el))
            )*/
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
/*        gameplayState().tour.tourEffects.push(effect);
        gameplayState().tour.tourEffects = gameplayState().tour.tourEffects.sort(this.sortByPriority);*/
    }

    public removeTourEffect(effect: TourEffect): void {
/*        gameplayState().tour.tourEffects = gameplayState().tour.tourEffects.filter((tourEffect: TourEffect) => tourEffect !== effect);*/
    }

    private createGroupOfEffects(): TourEffect[][] {
        const groups: TourEffect[][] = [];
        let effectsInThisTour = this.copyEffectsExecutedInThisTour();

        while (effectsInThisTour.length) {
            const priority = effectsInThisTour[0].priority;
            groups.push(effectsInThisTour.filter((el: TourEffect) => el.priority === priority));
            effectsInThisTour = effectsInThisTour.filter((el: TourEffect) => el.priority !== priority);
        }
        return groups;
    }

    private copyEffectsExecutedInThisTour(): TourEffect[] {
        return [];
        /*return [...gameplayState().tour.tourEffects]
            .filter((el: TourEffect) => el.fromTour === undefined || el.fromTour <= gameplayState().tour.currentTour + 1 && (el.toTour === undefined || el.toTour > gameplayState().tour.currentTour));*/
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
}
