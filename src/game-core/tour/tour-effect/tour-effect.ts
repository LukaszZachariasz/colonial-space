import {EMPTY, Observable, delay, of, tap} from 'rxjs';

export type TourEffectExecute = () => void;

export class TourEffect {
    constructor(public priority: number,
                public effect: TourEffectExecute) {
    }

    public execute(): Observable<any> {
        return of(EMPTY).pipe(
            delay(500),
            tap(() => this.effect())
        );
    }
}