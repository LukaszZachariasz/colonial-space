import {EMPTY, Observable, of, switchMap} from 'rxjs';

export type TourEffectExecute = () => Observable<any>;

export class TourEffect {
    constructor(public priority: number,
                public fromTour: number | undefined,
                public toTour: number | undefined,
                public effect: TourEffectExecute) {
    }

    public execute(): Observable<any> {
        return of(EMPTY).pipe(
            switchMap(() => this.effect())
        );
    }
}
