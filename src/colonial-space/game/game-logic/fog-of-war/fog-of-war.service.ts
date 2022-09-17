import {Injectable} from '@colonial-space/core/injector/injectable';
import {Subject} from 'rxjs';

@Injectable()
export class FogOfWarService {
    public removeFogOfWar$ = new Subject<string>();
}
