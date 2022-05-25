import {Subject, forkJoin, map, switchMap, tap} from 'rxjs';
import {TourEffect} from './tour-effect';
import {selectCurrentTour} from '../../../store/tour/tour.selectors';

type ExecuteEffectGroup = {current: TourEffect[], pending: TourEffect[][]};

export class TourEffectService {
    public completeTourEffects$ = new Subject<void>();
    public tourEffects: TourEffect[] = [];

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
            tap(() => this.tourEffects
                .filter((el: TourEffect) => el.toTour)
                .filter((el: TourEffect) => selectCurrentTour() >= el.toTour)
                .forEach((el: TourEffect) => this.removeTourEffect(el))
            )
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
        this.tourEffects.push(effect);
        this.tourEffects = this.tourEffects.sort(this.sortByPriority);
    }

    public removeTourEffect(effect: TourEffect): void {
        this.tourEffects = this.tourEffects.filter((tourEffect: TourEffect) => tourEffect !== effect);
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
        return [...this.tourEffects]
            .filter((el: TourEffect) => el.fromTour === undefined || el.fromTour <= selectCurrentTour() + 1 && (el.toTour === undefined || el.toTour > selectCurrentTour()));
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