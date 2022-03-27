import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../../logic/services/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../../logic/services/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber, filter, merge, tap} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../../../logic/services/tour/tour-effect/tour-effect-priority.enum';
import {UnitModel} from '../unit.model';
import {UnitMovementPathModel} from './unit-movement-path/unit-movement-path.model';
import {logic} from '../../../../../game';
import {sceneManager} from 'engine';

@HasTourEffects()
export class UnitMovement {
    public unitMovementPathModel: UnitMovementPathModel;

    constructor(private id: string,
                private transformMesh: BABYLON.AbstractMesh) {
        merge(
            logic().selectionService.selection$.pipe(
                tap(() => this.unitMovementPathModel?.lines?.dispose()),
                filter((unitModel: UnitModel) => this.id === unitModel?.id),
                tap(() => this.unitMovementPathModel = new UnitMovementPathModel(this.id)),
                tap(() => this.unitMovementPathModel.create(sceneManager().currentBabylonScene)),
            ),
            logic().unitMovementService.addedPlanMovement$.pipe(
                filter((id: string) => this.id === id),
                tap(() => this.unitMovementPathModel.recalculate())
            )
        ).subscribe();
    }

    @AddTourEffect({
        name: 'unit movement',
        priority: TourEffectPriorityEnum.UNIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    private move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            const position = logic().unitMovementService.moveUnit(this.id);
            if (this.unitMovementPathModel?.lines?.isDisposed() === false) {
                this.unitMovementPathModel.recalculate();
            }
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
