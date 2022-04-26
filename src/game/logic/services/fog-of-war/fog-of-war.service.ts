import {Subject} from 'rxjs';

export class FogOfWarService {
    public removeFogOfWar$ = new Subject<string>();
}