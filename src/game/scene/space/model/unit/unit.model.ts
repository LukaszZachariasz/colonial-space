import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../logic/tour/tour-effect/add-tour-effect';
import {selectSquareById} from '../../../../store/map/square/square.selectors';
import {Model} from '../model';
import {Observable, Subscriber} from 'rxjs';
import {Selectable} from '../../../../logic/selection/selectable';
import {UnitState} from '../../../../store/unit/unit.state';
import {logic} from '../../../../game';

export abstract class UnitModel extends Model implements Selectable {
    public state: UnitState;

    public abstract artUrl: string;
    public canBeMoved = true;

    protected meshes: BABYLON.AbstractMesh[];
    protected actionManager: BABYLON.ActionManager;

    protected select(): void {
        logic().selectionService.select(this);
    }

    @AddTourEffect({
        name: 'move-unit',
        priority: 999
    })
    protected move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.state.plannedMovement.length === 0) {
                subscriber.next();
                subscriber.complete();
            }

            for (let i = 0; i < this.state.movementSpeed; i++) {
                console.log('test');
                const plannedMovingId = this.state.plannedMovement.shift();
                if (plannedMovingId === undefined) {
                    subscriber.next();
                    subscriber.complete();
                }
                let completeAnimations = 0;
                this.meshes.forEach((mesh: BABYLON.AbstractMesh) => {
                    BABYLON.Animation.CreateAndStartAnimation(
                        'anim',
                        mesh,
                        'position',
                        30,
                        100,
                        mesh.position,
                        new BABYLON.Vector3(selectSquareById(plannedMovingId).x, mesh.position.y, selectSquareById(plannedMovingId).y),
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
            }
        });
    }
}
