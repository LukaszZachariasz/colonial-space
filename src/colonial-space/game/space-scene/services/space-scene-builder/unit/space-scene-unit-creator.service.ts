import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {UnitFactoryService} from './unit-factory.service';
import {UnitService} from '../../../../game-logic/unit/unit.service';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';
import {map, tap} from 'rxjs';
import {selectUnitById} from '../../../../game-logic/store/unit/unit.selectors';

@Injectable()
export class SpaceSceneUnitCreatorService implements OnLoad {
    @Inject(UnitService) private unitService: UnitService;
    @Inject(UnitFactoryService) private unitFactoryService: UnitFactoryService;

    public gameOnLoad(): void {
        this.unitService.addUnit$.pipe(
            map((id: string) => selectUnitById(id)),
            tap((unitState: UnitState) => this.unitFactoryService.create(unitState))
        ).subscribe();
    }
}
