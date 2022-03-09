import {Subject, forkJoin, map, switchMap, tap} from 'rxjs';
import {TourEffect} from './tour-effect';

type ExecuteEffectGroup = {current: TourEffect[], pending: TourEffect[][]};

export class TourEffectManager {
    public completeTourEffects$ = new Subject<void>();

    private tourEffects: TourEffect[] = [];
    private executeEffectGroup$ = new Subject<ExecuteEffectGroup>();

    constructor() {
        this.executeEffectGroup$.pipe(
            switchMap((executeEffectGroup: ExecuteEffectGroup) => forkJoin(executeEffectGroup.current.map((el: TourEffect) => el.execute())).pipe(
                map(() => executeEffectGroup))
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

    public addPostTourEffect(effect: TourEffect): void {
        this.tourEffects.push(effect);
        this.tourEffects.sort(this.sortByPriority);
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
        let copy = [...this.tourEffects];

        while (copy.length) {
            const priority = copy[0].priority;
            groups.push(copy.filter((el: TourEffect) => el.priority === priority));
            copy = copy.filter((el: TourEffect) => el.priority !== priority);
        }
        return groups;
    }
}