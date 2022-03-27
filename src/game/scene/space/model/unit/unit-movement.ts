import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../logic/services/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../logic/services/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../../logic/services/tour/tour-effect/tour-effect-priority.enum';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';

@HasTourEffects()
export class UnitMovement {
    constructor(private state: UnitState,
                private transformMesh: BABYLON.AbstractMesh) {
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

            // TODO: Quaternion rotation check ~ based on physic of babylon

            BABYLON.Animation.CreateAndStartAnimation(
                'anim',
                this.transformMesh,
                'position',
                30,
                100,
                this.transformMesh.position,
                new BABYLON.Vector3(position.x, this.transformMesh.position.y, position.y),
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                undefined,
                () => this.onAnimationEnd(subscriber)
            );
        });
    }

    private onAnimationEnd(subscriber: Subscriber<void>): void {
        subscriber.next();
        subscriber.complete();
    }
}
