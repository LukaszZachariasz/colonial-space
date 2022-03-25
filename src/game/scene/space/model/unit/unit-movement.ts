import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../logic/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../logic/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../../logic/tour/tour-effect/tour-effect-priority.enum';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectSquareById} from '../../../../store/map/square/square.selectors';

@HasTourEffects()
export class UnitMovement {
    private animationCompleted = 0;

    constructor(private state: UnitState,
                private meshes: BABYLON.AbstractMesh[]) {
    }

    @AddTourEffect({
        name: 'unit movement',
        priority: TourEffectPriorityEnum.UNIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    protected move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.state.plannedMovement.length === 0) {
                subscriber.next();
                subscriber.complete();
            }

            for (let i = 0; i < this.state.movementSpeed; i++) {
                const plannedMovingId = this.state.plannedMovement.shift();
                if (plannedMovingId === undefined) {
                    subscriber.next();
                    subscriber.complete();
                }
                this.animationCompleted = 0;
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
                        () => this.onAnimationEnd(subscriber)
                    );
                });
            }
        });
    }

    private onAnimationEnd(subscriber: Subscriber<void>): void {
        this.animationCompleted++;
        if (this.animationCompleted === this.meshes.length) {
            subscriber.next();
            subscriber.complete();
        }
    }
}
