import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class LoadingManagerService {
  public isLoading$ = new BehaviorSubject(false);
  public loadingUuid: string[] = [];

  public start(uuid: string): void {
    this.loadingUuid.push(uuid);
    this.isLoading$.next(!!this.loadingUuid.length);
  }

  public stop(uuid: string): void {
    this.loadingUuid = this.loadingUuid.filter((el: string) => el !== uuid);
    this.isLoading$.next(!!this.loadingUuid.length);
  }
}
