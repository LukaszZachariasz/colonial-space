import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../logic/services/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../logic/services/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../../logic/services/tour/tour-effect/tour-effect-priority.enum';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';

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
            const position = logic().unitMovementService.moveUnit(this.state.id);
            if (position === undefined) {
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
                    new BABYLON.Vector3(position.x, mesh.position.y, position.y),
                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                    undefined,
                    () => this.onAnimationEnd(subscriber)
                );
            });
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
