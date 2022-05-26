import {Subject} from 'rxjs';

export class BuildingService {
    public open$: Subject<string> = new Subject<string>();
}