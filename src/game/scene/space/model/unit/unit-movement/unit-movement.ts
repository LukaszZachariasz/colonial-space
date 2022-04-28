import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../../logic/services/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../../logic/services/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber, filter, merge, tap} from 'rxjs';
import {TourEffectPriorityEnum} from '../../../../../logic/services/tour/tour-effect/tour-effect-priority.enum';
import {UnitModel} from '../unit.model';
import {UnitMovementPathModel} from './unit-movement-path/unit-movement-path.model';
import {gameEngine} from '../../../../../../core/game-platform';
import {logic} from '../../../../../game';

@HasTourEffects()
export class UnitMovement {
    public unitMovementPathModel: UnitMovementPathModel;

    private position: BABYLON.Vector2;
    private unitRotate = (): void => this.lerpUnitRotate();
    private unitRotationSubscriber: Subscriber<any>;

    constructor(private scene: BABYLON.Scene,
                private id: string,
                private transformMesh: BABYLON.AbstractMesh) {
        merge(
            logic().selectedUnitService.selectedUnit$.pipe(
                tap(() => this.unitMovementPathModel?.lines?.dispose()),
                filter((unitModel: UnitModel) => this.id === unitModel?.unitId),
                tap(() => this.unitMovementPathModel = new UnitMovementPathModel(this.scene, this.id)),
            ),
            logic().unitMovementService.addedPlanMovement$.pipe(
                filter((id: string) => this.id === id),
                tap(() => this.unitMovementPathModel.recalculate())
            )
        ).subscribe();
    }

    @AddTourEffect({
        name: 'unit init move',
        priority: TourEffectPriorityEnum.UNIT_INIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    public initMove(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            this.position = logic().unitMovementService.moveUnit(this.id);
            subscriber.next();
            subscriber.complete();
        });
    }

    @AddTourEffect({
        name: 'unit rotation',
        priority: TourEffectPriorityEnum.UNIT_ROTATE_TOUR_EFFECT_PRIORITY
    })
    public rotation(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.position === undefined) {
                subscriber.next();
                subscriber.complete();
                return;
            }
            this.unitRotationSubscriber = subscriber;
            gameEngine().sceneManager.currentScene.scene.registerBeforeRender(this.unitRotate);
        });
    }

    @AddTourEffect({
        name: 'unit movement',
        priority: TourEffectPriorityEnum.UNIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    public move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.unitMovementPathModel?.lines?.isDisposed() === false) {
                this.unitMovementPathModel.recalculate();
            }
            if (this.position === undefined) {
                subscriber.next();
                subscriber.complete();
                return;
            }

            BABYLON.Animation.CreateAndStartAnimation(
                'anim',
                this.transformMesh,
                'position',
                30,
                60,
                this.transformMesh.position,
                new BABYLON.Vector3(this.position.x, this.transformMesh.position.y, this.position.y),
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.BezierCurveEase(0.60, 0, 0.50, 1),
                () => this.onAnimationEnd(subscriber)
            );
        });
    }

    private onAnimationEnd(subscriber: Subscriber<void>): void {
        subscriber.next();
        subscriber.complete();
    }

    private lerpUnitRotate(): void {
        const tempQuat = BABYLON.Quaternion.Identity();
        const slerpAmount = .1;
        tempQuat.copyFrom(this.transformMesh.rotationQuaternion);
        this.transformMesh.lookAt(new BABYLON.Vector3(this.position.x, this.transformMesh.position.y, this.position.y));

        BABYLON.Quaternion.SlerpToRef(tempQuat, this.transformMesh.rotationQuaternion, slerpAmount, this.transformMesh.rotationQuaternion);

        if (this.transformMesh.rotationQuaternion.equalsWithEpsilon(tempQuat)) {
            gameEngine().sceneManager.currentScene.scene.unregisterBeforeRender(this.unitRotate);
            this.unitRotationSubscriber.next();
            this.unitRotationSubscriber.complete();
        }
    }
}
