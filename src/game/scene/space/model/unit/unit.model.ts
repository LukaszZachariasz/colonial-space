import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../logic/tour/tour-effect/add-tour-effect';
import {Inject} from '../../../../../core/injector/inject';
import {Model} from '../model';
import {Observable, Subscriber} from 'rxjs';
import {Selectable} from '../../../../logic/selection/selectable';
import {SelectionService} from '../../../../logic/selection/selection.service';
import {UnitState} from '../../../../store/unit/unit.state';


export abstract class UnitModel extends Model implements Selectable {
    public state: UnitState;

    public abstract artUrl: string;
    public canBeMoved = true;

    protected meshes: BABYLON.AbstractMesh[];
    protected actionManager: BABYLON.ActionManager;
    
    @Inject(SelectionService) protected selectionService: SelectionService;

    protected select(): void {
        this.selectionService.select(this);
    }

    @AddTourEffect({
        name: 'move-unit',
        priority: 999
    })
    protected move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            let completeAnimations = 0;
            this.meshes.forEach((mesh: BABYLON.AbstractMesh) => {
                BABYLON.Animation.CreateAndStartAnimation(
                    'anim',
                    mesh,
                    'position',
                    30,
                    100,
                    mesh.position,
                    new BABYLON.Vector3(0, 0, 0),
                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                    undefined,
                    () => {
                        completeAnimations++;
                        if (completeAnimations === this.meshes.length) {
                            subscriber.next();
                            subscriber.complete();
                        }
                    }
                );
            });
        });
    }
}
