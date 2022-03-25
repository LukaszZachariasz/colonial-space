import {BehaviorSubject} from 'rxjs';

export class ResolveInjections {
    public static resolve$ = new BehaviorSubject<boolean>(false);
}
