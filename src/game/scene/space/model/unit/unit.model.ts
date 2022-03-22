import * as BABYLON from 'babylonjs';
import {Observable, Subscriber} from 'rxjs';
import {logic} from '../../../../game';
import {Selectable} from '../../../../logic/select-model-manager/selectable';
import {AddTourEffect} from '../../../../logic/tour-manager/tour-effect/add-tour-effect';
import {UnitState} from '../../../../store/unit/unit.state';
import {Model} from '../model';

export abstract class UnitModel extends Model implements Selectable {
    public state: UnitState;

    public abstract artUrl: string;

    protected meshes: BABYLON.AbstractMesh[];
    protected actionManager: BABYLON.ActionManager;

    protected select(): void {
        logic().selectModelManager.select(this);
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
