import {EMPTY, Observable, of, tap} from 'rxjs';

export type TourEffectExecute = () => void;

export class TourEffect {
    constructor(public priority: number,
                public fromTour: number | undefined,
                public toTour: number | undefined,
                public effect: TourEffectExecute) {
    }

    public execute(): Observable<any> {
        return of(EMPTY).pipe(
            tap(() => this.effect())
        );
    }
}
